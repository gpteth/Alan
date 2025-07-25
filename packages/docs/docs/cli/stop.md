---
sidebar_position: 4
title: Stop Command
description: Stop running alanOS agents and services
keywords: [stop, shutdown, terminate, agent management, process control]
---

# Stop Command

Stop running alanOS agents and free up system resources.

## Overview

The `stop` command allows you to gracefully shutdown running alanOS agents and services. This is useful for:

- Stopping agents during development
- Freeing up system resources
- Changing configurations
- Restarting with different settings

## Usage

```bash
alanos stop [options]
```

## Options

| Option           | Description                          |
| ---------------- | ------------------------------------ |
| `--all`          | Stop all running alanOS processes   |
| `--agent <name>` | Stop a specific agent by name        |
| `--force`        | Force stop without graceful shutdown |
| `--quiet`        | Suppress confirmation messages       |

## Examples

### Basic Usage

```bash
# Stop all running agents
alanos stop

# Stop with confirmation
alanos stop --all

# Stop specific agent
alanos stop --agent my-agent

# Force stop all agents
alanos stop --all --force
```

### Process Management

```bash
# Check running agents before stopping
ps aux | grep alanos

# Stop and verify
alanos stop --all
ps aux | grep alanos  # Should show no processes
```

### Development Workflow

```bash
# Start agent
alanos start --character my-agent.json

# Make changes to configuration
# ...

# Stop agent
alanos stop --agent my-agent

# Restart with new configuration
alanos start --character my-agent.json
```

## Graceful Shutdown

By default, the stop command performs a graceful shutdown:

1. **Signal agents**: Sends shutdown signal to agents
2. **Complete tasks**: Allows current operations to complete
3. **Save state**: Persists conversation history and state
4. **Close connections**: Cleanly disconnects from services
5. **Release resources**: Frees memory and file handles

## Force Stop

Use `--force` when graceful shutdown fails:

```bash
# Force stop if agent is unresponsive
alanos stop --force

# Force stop specific agent
alanos stop --agent stuck-agent --force
```

**Warning**: Force stop may result in:

- Loss of unsaved conversation state
- Incomplete operations
- Connection cleanup issues

## Multiple Agents

When running multiple agents:

```bash
# List all running agents
alanos agent list

# Stop specific agents
alanos stop --agent agent1
alanos stop --agent agent2

# Stop all at once
alanos stop --all
```

## Integration with System Services

### Linux/macOS (systemd)

```bash
# Create service file
sudo nano /etc/systemd/system/alanos.service

# Stop via systemd
sudo systemctl stop alanos
```

### Process Managers

```bash
# PM2
pm2 stop alanos

# Forever
forever stop alanos

# Supervisor
supervisorctl stop alanos
```

## Troubleshooting

### Agent Won't Stop

```bash
# Find process ID
ps aux | grep alanos

# Manual kill if needed
kill -TERM <pid>

# Force kill as last resort
kill -9 <pid>
```

### Port Still in Use

```bash
# Find process using port
lsof -i :3000

# Kill process holding port
kill -9 $(lsof -ti:3000)
```

### Cleanup After Force Stop

```bash
# Remove lock files
rm -f ~/.alanos/*.lock

# Clear temp files
rm -rf ~/.alanos/tmp/*

# Reset state if needed
alanos env reset
```

## Best Practices

1. **Always try graceful shutdown first**
2. **Wait for confirmation before force stopping**
3. **Check for running processes after stop**
4. **Clean up resources if force stop was used**
5. **Document any issues for debugging**

## Exit Codes

| Code | Description                           |
| ---- | ------------------------------------- |
| 0    | Successful shutdown                   |
| 1    | General error                         |
| 2    | No agents running                     |
| 3    | Partial shutdown (some agents failed) |
| 130  | Interrupted by user (Ctrl+C)          |

## Related Commands

- [`start`](./start.md): Start alanOS agents
- [`agent`](./agent.md): Manage individual agents
- [`dev`](./dev.md): Development mode with auto-restart
- [`env`](./env.md): Environment configuration

## Notes

- The stop command saves conversation state by default
- Agents can be restarted with the same state
- Use `--force` only when necessary
- Check logs if shutdown fails
