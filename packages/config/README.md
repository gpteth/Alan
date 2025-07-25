# @alanos/config

Shared configuration package for alanOS projects and plugins. This package provides standardized TypeScript, ESLint, and Prettier configurations to ensure consistency across the alanOS ecosystem.

## Overview

This package centralizes common development configurations used throughout alanOS, making it easy to maintain consistent code style, linting rules, and TypeScript settings across all packages and plugins.

## Installation

```bash
bun add -d @alanos/config
```

## Available Configurations

### TypeScript Configurations

- **Base Config** (`tsconfig.base.json`): Core TypeScript settings for all alanOS packages
- **Plugin Config** (`tsconfig.plugin.json`): Extends base config with plugin-specific settings
- **Frontend Config** (`tsconfig.frontend.json`): For frontend/client-side packages
- **Test Config** (`tsconfig.test.json`): Optimized for test files

### ESLint Configurations

- **Base Config** (`eslint.config.base.js`): Core linting rules and settings
- **Plugin Config** (`eslint.config.plugin.js`): ESLint configuration for plugins
- **Frontend Config** (`eslint.config.frontend.js`): ESLint rules for frontend code

### Prettier Configuration

- **Prettier Config** (`prettier.config.js`): Standard code formatting rules

## Usage

### TypeScript Configuration

In your `tsconfig.json`:

```json
{
  "extends": "@alanos/config/typescript/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

For plugins, extend the plugin-specific config:

```json
{
  "extends": "@alanos/config/typescript/tsconfig.plugin.json"
}
```

### ESLint Configuration

Create an `eslint.config.js` file:

```javascript
import pluginConfig from '@alanos/config/eslint/eslint.config.plugin.js';

export default [
  ...pluginConfig,
  {
    // Your custom rules here
  },
];
```

### Prettier Configuration

Create a `prettier.config.js` file:

```javascript
import prettierConfig from '@alanos/config/prettier/prettier.config.js';

export default {
  ...prettierConfig,
  // Your custom overrides here
};
```

Or reference it directly in `package.json`:

```json
{
  "prettier": "@alanos/config/prettier/prettier.config.js"
}
```

## Exports

The package provides the following exports for direct import:

```javascript
// TypeScript configs
import tsConfigBase from '@alanos/config/typescript/tsconfig.base.json';
import tsConfigPlugin from '@alanos/config/typescript/tsconfig.plugin.json';
import tsConfigFrontend from '@alanos/config/typescript/tsconfig.frontend.json';
import tsConfigTest from '@alanos/config/typescript/tsconfig.test.json';

// ESLint configs
import eslintConfigPlugin from '@alanos/config/eslint/eslint.config.plugin.js';
import eslintConfigFrontend from '@alanos/config/eslint/eslint.config.frontend.js';
import {
  baseConfig,
  testOverrides,
  standardIgnores,
} from '@alanos/config/eslint/eslint.config.base.js';

// Prettier config
import prettierConfig from '@alanos/config/prettier/prettier.config.js';
```

## Configuration Paths

The package also exports configuration paths that can be used programmatically:

```javascript
import { configPaths } from '@alanos/config';

console.log(configPaths.typescript.base); // '@alanos/configs/typescript/tsconfig.base.json'
console.log(configPaths.eslint.plugin); // '@alanos/configs/eslint/eslint.config.plugin.js'
console.log(configPaths.prettier); // '@alanos/configs/prettier/prettier.config.js'
```

## Development

This is a private package used internally by alanOS. To make changes:

1. Clone the alanOS monorepo
2. Make your changes in `packages/config/src/`
3. Run `bun run format` to ensure formatting
4. Submit a PR with your changes

### Scripts

- `bun run lint` - Format code with Prettier
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting

## License

MIT
