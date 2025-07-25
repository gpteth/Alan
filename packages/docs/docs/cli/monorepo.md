---
sidebar_position: 10
title: Monorepo Command
description: Clone the alanOS monorepo for development or contribution
keywords: [monorepo, setup, clone, git, development, contribution]
image: /img/cli.jpg
---

# Monorepo Command

Clone alanOS monorepo from a specific branch, defaults to develop.

## Usage

```bash
alanos monorepo [options]
```

## Options

| Option                  | Description           | Default   |
| ----------------------- | --------------------- | --------- |
| `-b, --branch <branch>` | Branch to clone       | `develop` |
| `-d, --dir <directory>` | Destination directory | `./alan` |

## How It Works

1. **Checks Destination**: Verifies the target directory is empty or doesn't exist
2. **Clones Repository**: Downloads the `alanOS/alan` repository from GitHub
3. **Shows Next Steps**: Displays instructions for getting started

## Examples

### Basic Usage

```bash
# Clone default branch (develop) to default directory (./alan)
alanos monorepo

# Clone with verbose output
alanos monorepo --dir ./alan --branch develop
```

### Custom Branch

```bash
# Clone main branch
alanos monorepo --branch main

# Clone feature branch for testing
alanos monorepo --branch feature/new-api

# Clone release branch
alanos monorepo --branch v2.1.0
```

### Custom Directory

```bash
# Clone to custom directory
alanos monorepo --dir my-alan-dev

# Clone to current directory (must be empty)
alanos monorepo --dir .

# Clone to nested path
alanos monorepo --dir ./projects/alan-fork
```

### Development Workflows

```bash
# For contribution development
alanos monorepo --branch main --dir ./alan-contrib

# For stable development
alanos monorepo --branch main --dir ./alan-stable

# For testing specific features
alanos monorepo --branch feature/new-plugin-system
```

## After Setup

Once cloned, follow these steps:

```bash
cd alan                           # Navigate to the cloned directory
bun i && bun run build            # Install dependencies and build
```

### Development Commands

```bash
# Start development server
bun run dev

# Run tests
bun test

# Build all packages
bun run build

# Start a specific package
cd packages/client-web
bun dev
```

## Monorepo Structure

The cloned repository includes:

```
alan/
├── packages/
│   ├── core/              # Core alanOS functionality
│   ├── client-web/        # Web interface
│   ├── client-discord/    # Discord client
│   ├── plugin-*/          # Various plugins
│   └── cli/              # CLI tool source
├── docs/                 # Documentation
├── examples/             # Example projects
└── scripts/              # Build and utility scripts
```

## Use Cases

### Contributors

Perfect for developers wanting to:

- Submit pull requests
- Develop new plugins
- Fix bugs or add features
- Understand the codebase

### Advanced Users

Useful for users who need:

- Custom builds
- Experimental features
- Local plugin development
- Integration testing

### Plugin Developers

Essential for:

- Plugin development and testing
- Understanding plugin APIs
- Contributing to core functionality

## Troubleshooting

### Clone Failures

```bash
# If git clone fails, check network connection
git --version
ping github.com

# For authentication issues
git config --global credential.helper store
```

### Directory Issues

```bash
# If directory is not empty
ls -la ./alan              # Check contents
rm -rf ./alan              # Remove if safe
alanos monorepo            # Retry

# For permission issues
sudo chown -R $USER:$USER ./alan
```

### Build Failures

```bash
# If dependencies fail to install
cd alan
rm -rf node_modules
bun install

# If build fails
bun run clean
bun install
bun run build
```

### Branch Not Found

```bash
# List available branches
git ls-remote --heads https://github.com/alanOS/alan

# Use correct branch name
alanos monorepo --branch main
```

## Notes

- The destination directory must be empty or non-existent
- Uses the official `alanOS/alan` repository from GitHub
- Requires Git to be installed on your system
- Internet connection required for cloning

## Related Commands

- [`create`](./create.md): Create a new project or plugin from templates
- [`plugins`](./plugins.md): Manage plugins in your project
- [`dev`](./dev.md): Run development server for your projects
