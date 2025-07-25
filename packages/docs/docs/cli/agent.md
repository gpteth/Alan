---
sidebar_position: 7
title: Agent Command
description: Managing alanOS agents through the CLI - list, configure, start, stop, and update agents
keywords: [CLI, agent, management, configuration, commands, options, actions]
image: /img/cli.jpg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Agent Command

Manage alanOS agents.

<Tabs>
<TabItem value="overview" label="Overview & Options" default>

## Usage

```bash
alanos agent [options] [command]
```

## Subcommands

| Subcommand | Aliases | Description                             | Required Options                                               | Additional Options                                                           |
| ---------- | ------- | --------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `list`     | `ls`    | List available agents                   |                                                                | `--format <format>`, `-r, --remote-url <url>`, `-p, --port <port>`           |
| `get`      | `g`     | Get agent details                       | `-n, --name <name>`                                            | `--format <format>`, `-o, --output [file]`, `-r, --remote-url`, `-p, --port` |
| `start`    | `s`     | Start an agent with a character profile | One of: `-n, --name`, `--path`, `--remote-character`           | `-r, --remote-url <url>`, `-p, --port <port>`                                |
| `stop`     | `st`    | Stop an agent                           | `-n, --name <name>`                                            | `-r, --remote-url <url>`, `-p, --port <port>`                                |
| `remove`   | `rm`    | Remove an agent                         | `-n, --name <name>`                                            | `-r, --remote-url <url>`, `-p, --port <port>`                                |
| `set`      |         | Update agent configuration              | `-n, --name <name>` AND one of: `-c, --config` OR `-f, --file` | `-r, --remote-url <url>`, `-p, --port <port>`                                |

## Options Reference

### Common Options (All Subcommands)

- `-r, --remote-url <url>`: URL of the remote agent runtime
- `-p, --port <port>`: Port to listen on

### Output Options (for `list` and `get`)

- `--format <format>`: Specify the output format. Options are `table` (default), `json`, or `yaml`.
- `-j, --json`: A shorthand for `--format json`.
- `-o, --output [file]`: For the `get` command, saves the agent's configuration to a JSON file. If no filename is provided, defaults to `{name}.json`.

### Get Specific Options

- `-n, --name <name>`: Agent id, name, or index number from list (required)

### Start Specific Options

- `-n, --name <name>`: Name of an existing agent to start
- `--path <path>`: Path to local character JSON file
- `--remote-character <url>`: URL to remote character JSON file

### Stop/Remove Specific Options

- `-n, --name <name>`: Agent id, name, or index number from list (required)

### Set Specific Options

- `-n, --name <name>`: Agent id, name, or index number from list (required)
- `-c, --config <json>`: Agent configuration as JSON string
- `-f, --file <path>`: Path to agent configuration JSON file

</TabItem>
<TabItem value="examples" label="Examples">

### Listing Agents

```bash
# List all available agents
alanos agent list

# Using alias
alanos agent ls

# List agents in JSON format
alanos agent list --format json
# Or using the shorthand
alanos agent list --j

# List agents in YAML format
alanos agent list --format yaml

# List agents from remote runtime
alanos agent list --remote-url http://server:3000

# List agents on specific port
alanos agent list --port 4000
```

### Getting Agent Details

```bash
# Get agent details by name
alanos agent get --name alan

# Get agent by ID
alanos agent get --name agent_123456

# Get agent by index from list
alanos agent get --name 0

# Display configuration as JSON in console
alanos agent get --name alan --format json

# Display configuration as YAML in console
alanos agent get --name alan --format yaml

# Save agent configuration to file
alanos agent get --name alan --output

# Save to specific file
alanos agent get --name alan --output ./my-agent.json

# Using alias
alanos agent g --name alan
```

### Starting Agents

```bash
# Start existing agent by name
alanos agent start --name alan

# Start with local character file
alanos agent start --path ./characters/alan.json

# Start from remote character file
alanos agent start --remote-character https://example.com/characters/alan.json

# Using alias
alanos agent s --name alan

# Start on specific port
alanos agent start --path ./alan.json --port 4000
```

**Required Configuration:**
You must provide one of these options: `--name`, `--path`, or `--remote-character`

### Stopping Agents

```bash
# Stop agent by name
alanos agent stop --name alan

# Stop agent by ID
alanos agent stop --name agent_123456

# Stop agent by index
alanos agent stop --name 0

# Using alias
alanos agent st --name alan

# Stop agent on remote runtime
alanos agent stop --name alan --remote-url http://server:3000
```

### Removing Agents

```bash
# Remove agent by name
alanos agent remove --name pmairca

# Remove agent by ID
alanos agent remove --name agent_123456

# Using alias
alanos agent rm --name pmairca

# Remove from remote runtime
alanos agent remove --name pmairca --remote-url http://server:3000
```

### Updating Agent Configuration

```bash
# Update with JSON string
alanos agent set --name alan --config '{"system":"Updated prompt"}'

# Update from configuration file
alanos agent set --name alan --file ./updated-config.json

# Update agent on remote runtime
alanos agent set --name pmairca --config '{"model":"gpt-4"}' --remote-url http://server:3000

# Update agent on specific port
alanos agent set --name alan --file ./config.json --port 4000
```

</TabItem>
<TabItem value="guides" label="Guides & Concepts">

## Output Formatting

The `list` and `get` commands support multiple output formats via the `--format` option, making it easy to use the CLI in scripts or for human readability.

### `table` (Default)

The default format is a human-readable table, best for viewing in the terminal.

```bash
$ alanos agent list
┌─────────┬──────────────┬─────────┬──────────┐
│ (index) │     name     │   id    │  status  │
├─────────┼──────────────┼─────────┼──────────┤
│    0    │   'alan'    │ 'agent…'│ 'running'│
└─────────┴──────────────┴─────────┴──────────┘
```

### `json`

Outputs raw JSON data. Useful for piping into other tools like `jq`. The `-j` flag is a convenient shorthand for `--format json`.

```bash
# Get JSON output
alanos agent get --name alan --format json
```

### `yaml`

Outputs YAML data, which can be more human-readable than JSON for complex configurations.

```bash
# Get YAML output
alanos agent get --name alan --format yaml
```

## Character File Structure

When using `--path` or `--remote-character`, the character file should follow this structure:

```json
{
  "name": "alan",
  "system": "You are a friendly and knowledgeable AI assistant named alan.",
  "bio": ["Helpful and engaging conversationalist", "Knowledgeable about a wide range of topics"],
  "plugins": ["@alanos/plugin-openai", "@alanos/plugin-discord"],
  "settings": {
    "voice": {
      "model": "en_US-female-medium"
    }
  },
  "knowledge": ["./knowledge/general-info.md", "./knowledge/conversation-patterns.md"]
}
```

## Agent Identification

Agents can be identified using:

1. **Agent Name**: Human-readable name (e.g., "alan", "pmairca")
2. **Agent ID**: System-generated ID (e.g., "agent_123456")
3. **List Index**: Position in `alanos agent list` output (e.g., "0", "1", "2")

## Interactive Mode

All agent commands support interactive mode when run without required parameters:

```bash
# Interactive agent selection
alanos agent get
alanos agent start
alanos agent stop
alanos agent remove
alanos agent set
```

## Remote Runtime Configuration

By default, agent commands connect to `http://localhost:3000`. Override with:

### Environment Variable

```bash
export AGENT_RUNTIME_URL=http://your-server:3000
alanos agent list
```

### Command Line Option

```bash
alanos agent list --remote-url http://your-server:3000
```

### Custom Port

```bash
alanos agent list --port 4000
```

## Agent Lifecycle Workflow

### 1. Create Agent Character

```bash
# Create character file
alanos create -type agent alan

# Or create project with character
alanos create -type project my-project
```

### 2. Start Agent Runtime

```bash
# Start the agent runtime server
alanos start
```

### 3. Manage Agents

```bash
# List available agents
alanos agent list

# Start an agent
alanos agent start --path ./alan.json

# Check agent status
alanos agent get --name alan

# Update configuration
alanos agent set --name alan --config '{"system":"Updated prompt"}'

# Stop agent
alanos agent stop --name alan

# Remove when no longer needed
alanos agent remove --name alan
```

</TabItem>
<TabItem value="troubleshooting" label="Troubleshooting">

## Troubleshooting

### Connection Issues

```bash
# Check if runtime is running
alanos agent list

# If connection fails, start runtime first
alanos start

# For custom URLs/ports
alanos agent list --remote-url http://your-server:3000
```

### Agent Not Found

```bash
# List all agents to see available options
alanos agent list

# Try using agent ID instead of name
alanos agent get --name agent_123456

# Try using list index
alanos agent get --name 0
```

### Configuration Errors

- Validate JSON syntax in character files and config strings
- Ensure all required fields are present in character definitions
- Check file paths are correct and accessible

## Related Commands

- [`create`](./create.md): Create a new agent character file
- [`start`](./start.md): Start the agent runtime server
- [`dev`](./dev.md): Run in development mode with hot-reload
- [`env`](./env.md): Configure environment variables for agents

</TabItem>
</Tabs>
