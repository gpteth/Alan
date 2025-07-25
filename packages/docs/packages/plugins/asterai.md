# @alanos/plugin-asterai

A plugin for interacting with [asterai](https://asterai.io) plugins and agents.

## Description

This plugin provides functionality to allow alan agents to interact with
asterai plugins and agents.

This will expand your alan character's utility by giving it access to all
the functionality of asterai's ecosystem of marketplace and private plugins
and agents.

## Installation

```bash
bun install @alanos/plugin-asterai
```

## Configuration

The plugin requires the following environment variables to be set:

```typescript
ASTERAI_AGENT_ID=
ASTERAI_PUBLIC_QUERY_KEY=
```

## Usage

### Basic Integration

```typescript
import { asteraiPlugin } from '@alanos/plugin-asterai';
```

### Example Usage

The plugin supports natural language for interacting with the asterai agent
through your alan character.

For example, if your asterai agent can fetch weather data:

```typescript
"Hey alan, how's the weather in LA?";
```

alan will then query the asterai agent to fetch the information.

## Development Guide

### Setting Up Development Environment

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Build the plugin:

```bash
bun run build
```

4. Run tests:

```bash
bun run test
```

## Contributing

Contributions are welcome! Please see the CONTRIBUTING.md file for more information.

## License

This plugin is part of the alan project. See the main project repository for license information.
