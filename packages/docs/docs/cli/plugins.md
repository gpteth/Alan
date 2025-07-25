---
sidebar_position: 4
title: Plugin Management
description: Manage alanOS plugins within a project - list, add, remove
keywords: [plugins, extensions, packages, npm, registry, installation, configuration]
image: /img/cli.jpg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Plugin Command

Manage alanOS plugins.

<Tabs>
<TabItem value="overview" label="Overview & Options" default>

## Usage

```bash
alanos plugins [options] [command]
```

## Subcommands

| Subcommand          | Aliases               | Description                                                                        | Arguments                                                                 | Options                                                                           |
| ------------------- | --------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `list`              | `l`, `ls`             | List available plugins to install into the project (shows v1.x plugins by default) |                                                                           | `--all` (detailed version info), `--v0` (v0.x compatible only)                    |
| `add`               | `install`             | Add a plugin to the project                                                        | `<plugin>` (plugins name e.g., "abc", "plugin-abc", "alanos/plugin-abc") | `-s, --skip-env-prompt`, `--skip-verification`, `-b, --branch`, `-T, --tag`       |
| `installed-plugins` |                       | List plugins found in the project dependencies                                     |                                                                           |                                                                                   |
| `remove`            | `delete`, `del`, `rm` | Remove a plugins from the project                                                  | `<plugin>` (plugins name e.g., "abc", "plugin-abc", "alanos/plugin-abc") |                                                                                   |
| `upgrade`           |                       | Upgrade a plugin from version 0.x to 1.x using AI-powered migration                | `<path>` (GitHub repository URL or local folder path)                     | `--api-key`, `--skip-tests`, `--skip-validation`                                  |
| `generate`          |                       | Generate a new plugin using AI-powered code generation                             |                                                                           | `--api-key`, `--skip-tests`, `--skip-validation`, `--skip-prompts`, `--spec-file` |

</TabItem>
<TabItem value="examples" label="Examples">

### Listing Available Plugins

```bash
# List available v1.x plugins (default behavior)
alanos plugins list

# Using alias
alanos plugins l

# List all plugins with detailed version information
alanos plugins list --all

# List only v0.x compatible plugins
alanos plugins list --v0
```

### Adding Plugins

```bash
# Add a plugin by short name (looks up '@alanos/plugin-openai')
alanos plugins add openai

# Add a plugin by full package name
alanos plugins add @alanos/plugin-anthropic

# Add plugin and skip environment variable prompts
alanos plugins add google-ai --skip-env-prompt

# Skip plugin verification after installation
alanos plugins add discord --skip-verification

# Add plugin from specific branch (for monorepo development)
alanos plugins add custom-plugin --branch feature/new-api

# Add a specific version/tag of a plugin from npm
alanos plugins add elevenlabs --tag latest

# Install plugin directly from GitHub (HTTPS URL)
alanos plugins add https://github.com/owner/my-plugin

# Install from GitHub with branch reference
alanos plugins add https://github.com/owner/my-plugin/tree/feature-branch

# Install using GitHub shorthand syntax
alanos plugins add github:owner/my-plugin

# Install specific branch using GitHub shorthand
alanos plugins add github:owner/my-plugin#feature-branch

# Using alias
alanos plugins install openai
```

### Listing Installed Plugins

```bash
# Show plugins currently in your project's package.json
alanos plugins installed-plugins
```

### Removing Plugins

```bash
# Remove plugin by short name
alanos plugins remove openai

# Remove plugin by full package name
alanos plugins remove @alanos/plugin-anthropic

# Using aliases
alanos plugins delete openai
alanos plugins del twitter
alanos plugins rm discord
```

### Upgrading Plugins (AI-Powered)

```bash
# Upgrade a plugin from v0.x to v1.x using AI migration
alanos plugins upgrade https://github.com/user/plugin-v0

# Upgrade from local folder
alanos plugins upgrade ./path/to/old-plugin

# Provide API key directly
alanos plugins upgrade ./my-plugin --api-key your-api-key

# Skip test validation
alanos plugins upgrade ./my-plugin --skip-tests

# Skip production readiness validation
alanos plugins upgrade ./my-plugin --skip-validation

# Run upgrade with all skips (faster but less safe)
alanos plugins upgrade ./my-plugin --skip-tests --skip-validation
```

### Generating New Plugins (AI-Powered)

```bash
# Generate a new plugin interactively
alanos plugins generate

# Generate with API key directly
alanos plugins generate --api-key your-api-key

# Generate from specification file (non-interactive)
alanos plugins generate --spec-file ./plugin-spec.json --skip-prompts

# Skip test validation during generation
alanos plugins generate --skip-tests

# Skip production readiness validation
alanos plugins generate --skip-validation
```

</TabItem>
<TabItem value="guides" label="Guides & Concepts">

## Plugin Installation Formats

The `add` command supports multiple plugin formats:

### Package Names

```bash
# Short name (auto-resolves to @alanos/plugin-*)
alanos plugins add openai

# Full package name
alanos plugins add @alanos/plugin-openai

# Scoped packages
alanos plugins add @company/plugin-custom
```

### GitHub Integration

```bash
# HTTPS URL
alanos plugins add https://github.com/user/my-plugin

# GitHub shorthand
alanos plugins add github:user/my-plugin

# With branch/tag
alanos plugins add github:user/my-plugin#feature-branch
```

### Version Control

```bash
# Specific npm tag
alanos plugins add plugin-name --tag beta

# Development branch (for monorepo)
alanos plugins add plugin-name --branch main
```

## Plugin Development Workflow

### 1. Create a Plugin

```bash
alanos create -t plugin my-awesome-plugin
cd plugin-my-awesome-plugin
```

### 2. Install in Your Project

```bash
# During development, install from local directory
alanos plugins add ./path/to/plugin-my-awesome-plugin

# Or install from your development branch
alanos plugins add my-awesome-plugin --branch feature/new-feature
```

### 3. Test Your Plugin

```bash
# Start development mode
alanos dev

# Run tests
alanos test
```

### 4. Publish Your Plugin

For detailed instructions on authentication, plugin requirements, and the full publishing process, see the [**`publish` command documentation**](./publish.md).

```bash
# Test the publishing process before committing
alanos publish --test

# Publish to the registry
alanos publish
```

## AI-Powered Plugin Development

alanOS includes AI-powered features to help with plugin development:

### Plugin Generation

The `generate` command uses AI to create a new plugin based on your specifications:

1. **Interactive Mode**: Guides you through plugin requirements
2. **Code Generation**: Creates complete plugin structure with actions, providers, and tests
3. **Validation**: Ensures generated code follows alanOS best practices

### Plugin Migration

The `upgrade` command helps migrate v0.x plugins to v1.x format:

1. **Automated Analysis**: Analyzes existing plugin structure
2. **Code Transformation**: Updates APIs, imports, and patterns
3. **Test Migration**: Converts tests to new format
4. **Validation**: Ensures migrated plugin works correctly

### Requirements

Both AI features require an Anthropic API key:

- Set via environment: `export ANTHROPIC_API_KEY=your-api-key`
- Or pass directly: `--api-key your-api-key`

</TabItem>
<TabItem value="troubleshooting" label="Troubleshooting">

## Troubleshooting

### Plugin Installation Failures

```bash
# Clear cache and retry
rm -rf ~/.alan/cache
alanos plugins add plugin-name
```

### Bun Installation Issues

```bash
# If you see "bun: command not found" errors
# Install Bun using the appropriate command for your system:

# Linux/macOS:
curl -fsSL https://bun.sh/install | bash

# Windows:
powershell -c "irm bun.sh/install.ps1 | iex"

# macOS with Homebrew:
brew install bun

# After installation, restart your terminal or:
source ~/.bashrc  # Linux
source ~/.zshrc   # macOS with zsh

# Verify installation:
bun --version
```

### Network Issues

```bash
# For GitHub authentication problems
git config --global credential.helper store

# For registry issues
bun config set registry https://registry.npmjs.org/
alanos plugins add plugin-name
```

### Plugin Not Found

```bash
# Check exact plugin name in registry
alanos plugins list

# Try different naming formats
alanos plugins add openai                    # Short name
alanos plugins add @alanos/plugin-openai   # Full package name
alanos plugins add plugin-openai            # With plugin prefix
```

### Dependency Conflicts

```bash
# If dependency installation fails
cd your-project
bun install

# Check for conflicting dependencies
bun pm ls

# Force reinstall
rm -rf node_modules
bun install
```

### Environment Variable Issues

```bash
# If plugin prompts for missing environment variables
alanos env set OPENAI_API_KEY your-key

# Skip environment prompts during installation
alanos plugins add plugin-name --no-env-prompt
```

### Branch/Tag Issues

```bash
# If branch doesn't exist
git ls-remote --heads https://github.com/user/repo

# If tag doesn't exist
git ls-remote --tags https://github.com/user/repo

# Use correct branch/tag name
alanos plugins add plugin-name --branch main
alanos plugins add plugin-name --tag v1.0.0
```

### AI Feature Issues

```bash
# Missing API key error
export ANTHROPIC_API_KEY=your-anthropic-key-here

# Or pass directly to command
alanos plugins generate --api-key your-anthropic-key-here

# Invalid specification file
# Ensure spec file is valid JSON
cat plugin-spec.json | jq .

# Generation/Upgrade timeout
# Skip validation for faster iteration
alanos plugins generate --skip-tests --skip-validation

# Out of memory during AI operations
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=8192" alanos plugins upgrade ./my-plugin
```

## Related Commands

- [`create`](./create.md): Create a new project or plugin
- [`env`](./env.md): Manage environment variables needed by plugins
- [`publish`](./publish.md): Publish your plugin to the registry

</TabItem>
</Tabs>
