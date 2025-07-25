---
sidebar_position: 2
title: Create Command
description: Initialize a new project, plugin, or agent with an interactive setup process
keywords: [create, project, plugin, setup, scaffolding, initialization, configuration]
image: /img/cli.jpg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create Command

Initialize a new project, plugin, or agent.

<Tabs>
<TabItem value="overview" label="Overview & Options" default>

## Usage

```bash
# Interactive mode (recommended)
alanos create

# With specific options
alanos create [options] [name]
```

## Getting Help

```bash
# View detailed help
alanos create --help
```

## Options

| Option              | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `-y, --yes`         | Skip confirmation and use defaults (default: `false`)            |
| `-t, --type <type>` | Type of template to use (`project`, `plugin`, `agent`, or `tee`) |
| `--template <name>` | Use a specific template by name (e.g., `default`, `minimal`)     |
| `--no-install`      | Skip automatic dependency installation after creation            |
| `--no-git`          | Skip `git init` for the new project                              |
| `[name]`            | Name for the project, plugin, or agent (optional)                |

## Interactive Process

When you run `alanos create` without options, it launches an interactive wizard:

1. **What would you like to name your project?** - Enter your project name
2. **Select your database:** - Choose between:
   - `sqlite` (local, file-based database)
   - `postgres` (requires connection details)

## Default Values (with -y flag)

When using the `-y` flag to skip prompts:

- **Default name**: `myproject`
- **Default type**: `project`
- **Default database**: `sqlite`

</TabItem>
<TabItem value="examples" label="Examples">

### Interactive Creation (Recommended)

```bash
# Start interactive wizard
alanos create
```

This will prompt you for:

- Project name
- Database selection (sqlite or postgres)

### Quick Creation with Defaults

```bash
# Create project with defaults (name: "myproject", database: sqlite)
alanos create -y
```

### Specify Project Name

```bash
# Create project with custom name, interactive database selection
alanos create my-awesome-project

# Create project with custom name and skip prompts
alanos create my-awesome-project -y
```

### Create Different Types

```bash
# Create a plugin interactively
alanos create -t plugin

# Create a plugin with defaults
alanos create -t plugin -y

# Create an agent character file
alanos create -t agent my-character-name

# Create a TEE (Trusted Execution Environment) project
alanos create -t tee my-tee-project
```

### Advanced Creation

```bash
# Create a project from a specific template
alanos create my-special-project --template minimal

# Create a project without installing dependencies automatically
alanos create my-lean-project --no-install

# Create a project without initializing a git repository
alanos create my-repo-less-project --no-git
```

### Creating in a Specific Directory

To create a project in a specific directory, navigate to that directory first:

```bash
# Navigate to your desired directory
cd ./my-projects
alanos create new-agent

# For plugins
cd ./plugins
alanos create -t plugin my-plugin
```

</TabItem>
<TabItem value="guides" label="Guides">

## Project Types

### Project (Default)

Creates a complete alanOS project with:

- Agent configuration and character files
- Knowledge directory for RAG
- Database setup (PGLite or Postgres)
- Test structure
- Build configuration

**Default structure:**

```
myproject/
├── src/
│   └── index.ts          # Main character definition
├── knowledge/            # Knowledge files for RAG
├── __tests__/           # Component tests
├── e2e/                 # End-to-end tests
├── .alandb/           # PGLite database (if selected)
├── package.json
└── tsconfig.json
```

### Plugin

Creates a plugin that extends alanOS functionality:

```bash
alanos create -t plugin my-plugin
```

**Plugin structure:**

```
plugin-my-plugin/         # Note: "plugin-" prefix added automatically
├── src/
│   └── index.ts         # Plugin implementation
├── images/              # Logo and banner for registry
├── package.json
└── tsconfig.json
```

### Agent

Creates a standalone agent character definition file:

```bash
alanos create -t agent my-character
```

This creates a single `.json` file with character configuration.

### TEE (Trusted Execution Environment)

Creates a project with TEE capabilities for secure, decentralized agent deployment:

```bash
alanos create -t tee my-tee-project
```

**TEE project structure:**

```
my-tee-project/
├── src/
│   └── index.ts          # Main character definition
├── knowledge/            # Knowledge files for RAG
├── docker-compose.yml    # Docker configuration for TEE deployment
├── Dockerfile           # Container definition
├── __tests__/           # Component tests
├── e2e/                 # End-to-end tests
├── .alandb/           # PGLite database (if selected)
├── package.json
└── tsconfig.json
```

## After Creation

The CLI will automatically:

1. **Install dependencies** using bun
2. **Build the project** (for projects and plugins)
3. **Show next steps**:
   ```bash
   cd myproject
   alanos start
   # Visit http://localhost:3000
   ```

## Database Selection

### PGLite (Recommended for beginners)

- Local file-based database
- No setup required
- Data stored in `.alandb/` directory

### Postgres

- Requires existing Postgres database
- Prompts for connection details during setup
- Better for production deployments

</TabItem>
<TabItem value="troubleshooting" label="Troubleshooting">

## Troubleshooting

### Creation Failures

```bash
# Check if you can write to the target directory
touch test-file && rm test-file

# If permission denied, change ownership or use different directory
alanos create -d ~/my-projects/new-project
```

### Dependency Installation Issues

```bash
# If bun install fails, try manual installation
cd myproject
bun install

# For network issues, clear cache and retry
bun pm cache rm
bun install
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

### Database Connection Problems

**PGLite Issues:**

- Ensure sufficient disk space in target directory
- Check write permissions for `.alandb/` directory

**Postgres Issues:**

- Verify database server is running
- Test connection with provided credentials
- Ensure database exists and user has proper permissions

### Build Failures

```bash
# Check for TypeScript errors
bun run build

# If build fails, check dependencies
bun install
bun run build
```

### Template Not Found

```bash
# Verify template type is correct
alanos create -t project    # Valid: project, plugin, agent
alanos create -t invalid    # Invalid template type
```

## Related Commands

- [`start`](./start.md): Start your created project
- [`dev`](./dev.md): Run your project in development mode
- [`env`](./env.md): Configure environment variables

</TabItem>
</Tabs>
