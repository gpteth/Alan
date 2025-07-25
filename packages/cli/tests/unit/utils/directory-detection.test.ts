import { describe, it, expect, mock, beforeEach, afterEach } from 'bun:test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { detectDirectoryType, isValidForUpdates } from '../../../src/utils/directory-detection';

// Test fixtures for consistent test data
const TestFixtures = {
  packageJson: {
    alanProject: {
      name: 'my-project',
      packageType: 'project',
      dependencies: {
        '@alanos/core': '^1.0.0',
      },
    },
    alanPlugin: {
      name: '@alanos/plugin-test',
      packageType: 'plugin',
      dependencies: {
        '@alanos/core': '^1.0.0',
      },
    },
    alanPluginByKeywords: {
      name: 'custom-plugin',
      keywords: ['plugin', 'alanos'],
      dependencies: {
        '@alanos/core': '^1.0.0',
      },
    },
    monorepoRoot: {
      name: 'monorepo-root',
      workspaces: ['packages/*'],
      // Explicitly no alanOS dependencies to avoid project classification
    },
    multiplealanDeps: {
      name: 'my-project',
      dependencies: {
        '@alanos/core': '^1.0.0',
        '@alanos/cli': '^1.0.0',
        '@alanos/plugin-discord': '^1.0.0',
      },
    },
    regularProject: {
      name: 'regular-project',
      dependencies: {
        express: '^4.0.0',
        react: '^18.0.0',
      },
    },
  },

  paths: {
    testPath: '/test/path',
    testPlugin: '/test/plugin',
    testMonorepo: '/test/monorepo',
    testSubdir: '/test/monorepo/subdir',
    testRegular: '/test/regular',
    testMissing: '/test/missing',
    testInvalid: '/test/invalid',
    testUnreadable: '/test/unreadable',
  },

  directoryInfo: {
    alanProject: {
      type: 'alanos-project' as const,
      hasPackageJson: true,
      hasalanOSDependencies: true,
      alanPackageCount: 1,
    },
    alanPlugin: {
      type: 'alanos-plugin' as const,
      hasPackageJson: true,
      hasalanOSDependencies: true,
      alanPackageCount: 1,
    },
    alanMonorepo: {
      type: 'alanos-monorepo' as const,
      hasPackageJson: true,
      hasalanOSDependencies: false,
      alanPackageCount: 0,
    },
    alanSubdir: {
      type: 'alanos-subdir' as const,
      hasPackageJson: false,
      hasalanOSDependencies: false,
      alanPackageCount: 0,
    },
    nonalanDir: {
      type: 'non-alanos-dir' as const,
      hasPackageJson: true,
      hasalanOSDependencies: false,
      alanPackageCount: 0,
    },
  },
};

// Mock fs
mock.module('node:fs', () => ({
  existsSync: mock(() => true),
  readFileSync: mock(() => '{}'),
  statSync: mock(() => ({ isDirectory: () => true })),
  readdirSync: mock(() => []),
}));

// Mock UserEnvironment - need to mock the singleton instance
const mockFindMonorepoRoot = mock();
const mockUserEnvironmentInstance = {
  findMonorepoRoot: mockFindMonorepoRoot,
};

mock.module('../../../src/utils/user-environment', () => ({
  UserEnvironment: {
    getInstance: mock(() => mockUserEnvironmentInstance),
  },
}));

describe('directory-detection', () => {
  let mocks: {
    findMonorepoRoot: any;
    existsSync: any;
    readFileSync: any;
    readdirSync: any;
    statSync: any;
  };

  beforeEach(() => {
    // Systematically reset all mocks
    mockFindMonorepoRoot.mockClear();
    (fs.existsSync as any).mockClear();
    (fs.readFileSync as any).mockClear();
    (fs.readdirSync as any).mockClear();
    (fs.statSync as any).mockClear();

    // Store mock references for easy access
    mocks = {
      findMonorepoRoot: mockFindMonorepoRoot,
      existsSync: fs.existsSync as any,
      readFileSync: fs.readFileSync as any,
      readdirSync: fs.readdirSync as any,
      statSync: fs.statSync as any,
    };

    // Set default successful mocks
    mocks.existsSync.mockReturnValue(true);
    mocks.readFileSync.mockReturnValue('{}');
    mocks.readdirSync.mockReturnValue([]);
    mocks.statSync.mockReturnValue({ isDirectory: () => true });
    mocks.findMonorepoRoot.mockReturnValue(null);
  });

  describe('detectDirectoryType', () => {
    it('should detect alanos project', () => {
      // Setup mocks using test fixtures
      mocks.existsSync.mockReturnValue(true);
      mocks.readFileSync.mockReturnValue(JSON.stringify(TestFixtures.packageJson.alanProject));
      mocks.readdirSync.mockReturnValue([]);
      mocks.findMonorepoRoot.mockReturnValue(null);

      const result = detectDirectoryType(TestFixtures.paths.testPath);

      expect(result.type).toBe('alanos-project');
      expect(result.hasPackageJson).toBe(true);
      expect(result.hasalanOSDependencies).toBe(true);
      expect(result.alanPackageCount).toBe(1);
    });

    it('should detect alanos plugin', () => {
      // Setup mocks using test fixtures
      mocks.existsSync.mockReturnValue(true);
      mocks.readFileSync.mockReturnValue(JSON.stringify(TestFixtures.packageJson.alanPlugin));
      mocks.readdirSync.mockReturnValue([]);
      mocks.findMonorepoRoot.mockReturnValue(null);

      const result = detectDirectoryType(TestFixtures.paths.testPlugin);

      expect(result.type).toBe('alanos-plugin');
      expect(result.hasPackageJson).toBe(true);
    });

    it('should detect monorepo root', () => {
      // Setup monorepo-specific file system mocking
      mocks.existsSync.mockImplementation((filepath) => {
        const pathStr = String(filepath);
        return pathStr.includes('package.json') || pathStr === TestFixtures.paths.testMonorepo;
      });
      mocks.readFileSync.mockReturnValue(JSON.stringify(TestFixtures.packageJson.monorepoRoot));
      mocks.readdirSync.mockReturnValue(['packages']);
      mocks.statSync.mockReturnValue({ isDirectory: () => true });
      mocks.findMonorepoRoot.mockReturnValue(TestFixtures.paths.testMonorepo);

      const result = detectDirectoryType(TestFixtures.paths.testMonorepo);

      expect(result.type).toBe('alanos-monorepo');
      expect(result.monorepoRoot).toBe(TestFixtures.paths.testMonorepo);
    });

    it('should detect alanos subdirectory in monorepo', () => {
      // Setup subdirectory-specific file system mocking
      mocks.existsSync.mockImplementation((filepath) => {
        const pathStr = String(filepath);
        if (pathStr.includes('package.json')) {
          return false; // No package.json in subdirectory
        }
        return pathStr === TestFixtures.paths.testSubdir;
      });
      mocks.readdirSync.mockReturnValue(['some-file.txt']);
      mocks.statSync.mockReturnValue({ isDirectory: () => true });
      mocks.findMonorepoRoot.mockReturnValue(TestFixtures.paths.testMonorepo);

      const result = detectDirectoryType(TestFixtures.paths.testSubdir);

      expect(result.type).toBe('alanos-subdir');
      expect(result.hasPackageJson).toBe(false);
      expect(result.monorepoRoot).toBe(TestFixtures.paths.testMonorepo);
    });

    it('should return non-alanos-dir for regular project', () => {
      // Setup regular project mocking
      mocks.existsSync.mockImplementation((filepath) => {
        const pathStr = String(filepath);
        return pathStr.includes('package.json');
      });
      mocks.readFileSync.mockReturnValue(JSON.stringify(TestFixtures.packageJson.regularProject));
      mocks.readdirSync.mockReturnValue([]);
      mocks.statSync.mockReturnValue({ isDirectory: () => true });
      mocks.findMonorepoRoot.mockReturnValue(null);

      const result = detectDirectoryType(TestFixtures.paths.testRegular);

      expect(result.type).toBe('non-alanos-dir');
      expect(result.hasalanOSDependencies).toBe(false);
    });

    it('should handle missing directory', () => {
      mocks.existsSync.mockReturnValue(false);

      const result = detectDirectoryType(TestFixtures.paths.testMissing);

      expect(result.type).toBe('non-alanos-dir');
      expect(result.hasPackageJson).toBe(false);
    });

    it('should handle invalid JSON in package.json', () => {
      mocks.existsSync.mockReturnValue(true);
      mocks.readFileSync.mockReturnValue('invalid json');
      mocks.readdirSync.mockReturnValue([]);
      mocks.findMonorepoRoot.mockReturnValue(null);

      const result = detectDirectoryType(TestFixtures.paths.testInvalid);

      expect(result.type).toBe('non-alanos-dir');
      expect(result.hasPackageJson).toBe(true);
    });

    it('should count multiple alanos packages', () => {
      mocks.existsSync.mockReturnValue(true);
      mocks.readFileSync.mockReturnValue(
        JSON.stringify(TestFixtures.packageJson.multiplealanDeps)
      );
      mocks.readdirSync.mockReturnValue([]);
      mocks.findMonorepoRoot.mockReturnValue(null);

      const result = detectDirectoryType(TestFixtures.paths.testPath);

      expect(result.alanPackageCount).toBe(3);
      expect(result.hasalanOSDependencies).toBe(true);
    });

    it('should detect plugin by keywords', () => {
      mocks.existsSync.mockReturnValue(true);
      mocks.readFileSync.mockReturnValue(
        JSON.stringify(TestFixtures.packageJson.alanPluginByKeywords)
      );
      mocks.readdirSync.mockReturnValue([]);
      mocks.findMonorepoRoot.mockReturnValue(null);

      const result = detectDirectoryType(TestFixtures.paths.testPlugin);

      expect(result.type).toBe('alanos-plugin');
    });

    it('should handle unreadable directory', () => {
      mocks.existsSync.mockReturnValue(true);
      mocks.readdirSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const result = detectDirectoryType(TestFixtures.paths.testUnreadable);

      expect(result.type).toBe('non-alanos-dir');
      expect(result.hasPackageJson).toBe(false);
    });
  });

  describe('isValidForUpdates', () => {
    it('should return true for alanos-project', () => {
      expect(isValidForUpdates(TestFixtures.directoryInfo.alanProject)).toBe(true);
    });

    it('should return true for alanos-plugin', () => {
      expect(isValidForUpdates(TestFixtures.directoryInfo.alanPlugin)).toBe(true);
    });

    it('should return true for alanos-monorepo', () => {
      expect(isValidForUpdates(TestFixtures.directoryInfo.alanMonorepo)).toBe(true);
    });

    it('should return true for alanos-subdir', () => {
      expect(isValidForUpdates(TestFixtures.directoryInfo.alanSubdir)).toBe(true);
    });

    it('should return false for non-alanos-dir', () => {
      expect(isValidForUpdates(TestFixtures.directoryInfo.nonalanDir)).toBe(false);
    });
  });
});
