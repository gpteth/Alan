# @alanos/plugin-movement

## Purpose

Movement Network plugin for alan OS that enables Movement Network blockchain functionality for your alan agent.

## Key Features

- Send MOVE tokens
- Check wallet balances
- Support for Movement Network transactions

## Installation

```bash
bun add @alanos/plugin-movement
```

## Configuration

Add the Movement plugin to your character's configuration:

```json
{
  "name": "Movement Agent",
  "plugins": ["@alanos/plugin-movement"],
  "settings": {
    "secrets": {
      "MOVEMENT_PRIVATE_KEY": "your_private_key_here",
      "MOVEMENT_NETWORK": "bardock"
    }
  }
}
```

Set up environment variables in `.env` file:

```bash
MOVEMENT_PRIVATE_KEY=your_private_key_here
MOVEMENT_NETWORK=bardock
```

## Integration

Enables Movement Network blockchain functionality for your alan agent.
