/**
 * Standard configuration exports for alanOS packages
 * Provides centralized access to all base configurations
 */

// TypeScript configurations
export { default as tsConfigBase } from './typescript/tsconfig.base.json';
export { default as tsConfigPlugin } from './typescript/tsconfig.plugin.json';
export { default as tsConfigFrontend } from './typescript/tsconfig.frontend.json';
export { default as tsConfigTest } from './typescript/tsconfig.test.json';

// ESLint configurations
export { default as eslintConfigPlugin } from './eslint/eslint.config.plugin.js';
export { default as eslintConfigFrontend } from './eslint/eslint.config.frontend.js';
export {
  baseConfig as eslintBaseConfig,
  testOverrides,
  standardIgnores,
} from './eslint/eslint.config.base.js';

// Prettier configuration
export { default as prettierConfig } from './prettier/prettier.config.js';

// Configuration paths for package.json references
export const configPaths = {
  typescript: {
    base: '@alanos/config/typescript/tsconfig.base.json',
    plugin: '@alanos/config/typescript/tsconfig.plugin.json',
    frontend: '@alanos/config/typescript/tsconfig.frontend.json',
    test: '@alanos/config/typescript/tsconfig.test.json',
  },
  eslint: {
    plugin: '@alanos/config/eslint/eslint.config.plugin.js',
    frontend: '@alanos/config/eslint/eslint.config.frontend.js',
  },
  prettier: '@alanos/config/prettier/prettier.config.js',
};
