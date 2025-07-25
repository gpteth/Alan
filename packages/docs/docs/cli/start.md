---
sidebar_position: 3
title: Start Command
description: Launch and manage alanOS projects and agents in production mode
keywords: [start, production, deployment, configuration, runtime, services, agents]
image: /img/cli.jpg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Start Command

Start the alan agent with configurable plugins and services.

<Tabs>
<TabItem value="overview" label="Overview & Options" default>

## Usage

```bash
alanos start [options]
```

## Options

| Option                   | Description                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| `-c, --configure`        | Force reconfiguration of services and AI models (bypasses saved configuration) |
| `--character [paths...]` | Character file(s) to use - accepts paths or URLs                               |
| `--build`                | Build the project before starting                                              |
| `--no-build`             | Skip the build step before starting                                            |
| `-p, --port <port>`      | Port to listen on (default: 3000)                                              |
| `--quiet`                | Suppress all non-error output to the console                                   |

</TabItem>
<TabItem value="examples" label="Examples">

### Basic Usage

```bash
# Start with default configuration
alanos start

# Start on custom port
alanos start --port 8080

# Build project before starting
alanos start --build

# Force reconfiguration
alanos start --configure
```

### Suppressing Output

```bash
# Start quietly, only showing errors
alanos start --quiet
```

### Character Configuration

```bash
# Start with single character file
alanos start --character ./character.json

# Start with multiple character files
alanos start --character ./char1.json ./char2.json

# Mix local files and URLs
alanos start --character ./local.json https://example.com/remote.json

# Character files without .json extension
alanos start --character assistant support-bot

# Comma-separated format also works
alanos start --character "char1.json,char2.json"
```

### Advanced Configurations

```bash
# Build and configure before starting
alanos start --build --configure

# Start with specific character on custom port
alanos start --character ./my-bot.json --port 4000

# Complete setup for production deployment
alanos start --character ./production-bot.json --port 3000 --build
```

### Production Deployment

```bash
# With environment file
cp .env.production .env
alanos start --build

# Background process (Linux/macOS)
nohup alanos start --build > alanos.log 2>&1 &
```

### Health Checks

```bash
# Verify service is running
curl http://localhost:3000/health

# Check process status
ps aux | grep alanos

# Monitor logs
tail -f alanos.log
```

</TabItem>
<TabItem value="guides" label="Guides & Concepts">

## Production Features

When you run `start`, alanOS provides production-ready features:

1. **Optimized Performance**: Runs with production optimizations
2. **Stable Configuration**: Uses saved configuration by default
3. **Service Management**: Handles service connections and disconnections
4. **Error Recovery**: Automatic recovery from transient errors
5. **Resource Management**: Efficient resource allocation and cleanup

## Startup Process

When you run the `start` command, alanOS:

1. **Project Detection**: Detects whether you're in a project or plugin directory
2. **Configuration Loading**: Loads and validates the configuration
3. **Database Initialization**: Initializes the database system
4. **Plugin Loading**: Loads required plugins
5. **Service Startup**: Starts any configured services
6. **Knowledge Processing**: Processes knowledge files if present
7. **API Server**: Starts the HTTP API server
8. **Agent Runtime**: Initializes agent runtimes
9. **Event Listening**: Begins listening for messages and events

</TabItem>
<TabItem value="troubleshooting" label="Troubleshooting">

## Troubleshooting

### Startup Failures

```bash
# Check if another instance is running
ps aux | grep alanos
pkill -f alanos

# Clear any conflicting processes
# Press Ctrl+C in the terminal where alanos start is running
alanos start
```

### Port Conflicts

```bash
# Check what's using the port
lsof -i :3000

# Use different port
alanos start --port 3001

# Or stop conflicting service
sudo kill -9 $(lsof -ti:3000)
alanos start
```

### Character Loading Issues

```bash
# Verify character file exists and is valid JSON
cat ./character.json | jq .

# Test with absolute path
alanos start --character /full/path/to/character.json

# Start without character to use default
alanos start
```

### Configuration Problems

```bash
# Force reconfiguration to fix corrupted settings
alanos start --configure

# Check environment variables
alanos env list

# Reset environment if needed
alanos env reset
alanos start --configure
```

### Build Failures

```bash
# Clean build and retry
alanos start --build

# Check for TypeScript errors
bun run build

# Install dependencies if missing
bun install
alanos start --build
```

### Service Connection Issues

```bash
# Check internet connectivity
ping google.com

# Verify API keys are set
alanos env list

# Test with minimal configuration
alanos start --configure
```

</TabItem>
</Tabs>

## Project Detection

alanOS automatically detects the type of directory you're in and adjusts its behavior accordingly:

- **alanOS Projects**: Loads project configuration and starts defined agents
- **alanOS Plugins**: Runs in plugin test mode with the default character
- **Other Directories**: Uses the default alan character

## Configuration Management

### Default Configuration

- Uses saved configuration from previous runs
- Loads environment variables from `.env` file
- Applies project-specific settings

### Force Reconfiguration

```bash
# Bypass saved configuration and reconfigure all services
alanos start --configure
```

This is useful when:

- You've changed API keys or service credentials
- You want to select different AI models
- Service configurations have changed
- Troubleshooting configuration issues

## Environment Variables

The `start` command automatically loads environment variables:

### From .env File

```bash
# alanOS looks for .env in the project directory
cd my-project
alanos start  # Loads from ./my-project/.env
```

### Direct Environment Variables

```bash
# Set variables directly
OPENAI_API_KEY=your-key alanos start

# Multiple variables
OPENAI_API_KEY=key1 DISCORD_TOKEN=token1 alanos start
```

## Error Handling

### Character Loading Errors

If character files fail to load, alanOS will:

1. **Log Errors**: Display detailed error messages for each failed character
2. **Continue Starting**: Use any successfully loaded characters
3. **Fallback**: Use the default alan character if no characters load successfully

### Service Connection Errors

- Automatic retry for transient connection issues
- Graceful degradation when optional services are unavailable
- Error logging with recovery suggestions

## Port Management

### Default Port

- Default: `3000`
- Automatically detects if port is in use
- Suggests alternative ports if default is unavailable

### Custom Port

```bash
# Specify custom port
alanos start --port 8080

# Check if port is available first
netstat -an | grep :8080
alanos start --port 8080
```

## Build Process

### Automatic Building

```bash
# Build before starting (recommended for production)
alanos start --build
```

### When to Use --build

- **First deployment**: Ensure all TypeScript is compiled
- **After code changes**: Refresh compiled output
- **Production deployment**: Guarantee latest build
- **Troubleshooting**: Eliminate build-related issues

## Health Checks

```bash
# Verify service is running
curl http://localhost:3000/health

# Check process status
ps aux | grep alanos

# Monitor logs
tail -f alanos.log
```

## Related Commands

- [`create`](./create.md): Create a new project to start
- [`dev`](./dev.md): Run in development mode with hot reloading
- [`agent`](./agent.md): Manage individual agents
- [`env`](./env.md): Configure environment variables
- [`stop`](./stop.md): Stop running agents
