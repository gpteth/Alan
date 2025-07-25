import { describe, it, expect, mock } from 'bun:test';
import { useConvertCharacter } from '../use-character-convert';

// Mock the usePlugins hook
const mockUsePlugins = mock();

mock.module('@/hooks/use-plugins', () => ({
  usePlugins: mockUsePlugins,
}));

describe('useConvertCharacter', () => {
  it('should only include plugins that exist in availablePlugins', () => {
    // Set up mock return value
    mockUsePlugins.mockImplementation(() => ({
      data: ['@alanos/plugin-sql', '@alanos/plugin-bootstrap', '@alanos/plugin-discord'],
    }));

    const { convertCharacter } = useConvertCharacter();

    const v1Character = {
      name: 'Test Character',
      clients: ['discord'],
      modelProvider: 'google',
      bio: ['Test bio'],
    };

    const result = convertCharacter(v1Character);

    // Should only include plugins that exist in availablePlugins
    expect(result.plugins).toEqual([
      '@alanos/plugin-bootstrap',
      '@alanos/plugin-discord',
      '@alanos/plugin-sql',
    ]);
  });

  it('should not include non-existent plugins', () => {
    // Set up mock return value with limited set
    mockUsePlugins.mockImplementation(() => ({
      data: ['@alanos/plugin-sql'], // Only sql plugin available
    }));

    const { convertCharacter } = useConvertCharacter();

    const v1Character = {
      name: 'Test Character',
      clients: ['discord', 'slack'], // These plugins don't exist
      modelProvider: 'openai', // This plugin doesn't exist
      bio: ['Test bio'],
    };

    const result = convertCharacter(v1Character);

    // Should only include plugins that actually exist
    expect(result.plugins).toEqual(['@alanos/plugin-sql']);
    expect(result.plugins).not.toContain('@alanos/plugin-discord');
    expect(result.plugins).not.toContain('@alanos/plugin-slack');
    expect(result.plugins).not.toContain('@alanos/plugin-openai');
  });

  it('should handle empty availablePlugins gracefully', () => {
    // Set up mock return value with empty array
    mockUsePlugins.mockImplementation(() => ({
      data: [],
    }));

    const { convertCharacter } = useConvertCharacter();

    const v1Character = {
      name: 'Test Character',
      clients: ['discord'],
      modelProvider: 'google',
      bio: ['Test bio'],
    };

    const result = convertCharacter(v1Character);

    // Should return empty plugins array when no plugins are available
    expect(result.plugins).toEqual([]);
  });

  it('should handle mapped plugins correctly', () => {
    // Set up mock return value including mapped ones
    mockUsePlugins.mockImplementation(() => ({
      data: ['@alanos/plugin-google-genai', '@alanos/plugin-sql'],
    }));

    const { convertCharacter } = useConvertCharacter();

    const v1Character = {
      name: 'Test Character',
      modelProvider: 'google', // This should map to @alanos/plugin-google-genai
      bio: ['Test bio'],
    };

    const result = convertCharacter(v1Character);

    // Should include the mapped plugin
    expect(result.plugins).toContain('@alanos/plugin-google-genai');
    expect(result.plugins).toContain('@alanos/plugin-sql');
  });
});
