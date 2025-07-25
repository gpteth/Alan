# @alanos/plugin-movement

Movement Network plugin for alan OS. This plugin enables Movement Network blockchain functionality for your alan agent.

## Features

- Send MOVE tokens
- Check wallet balances
- Support for Movement Network transactions

## Installation

```bash
bun add @alanos/plugin-movement
```

## Instructions

1. First, ensure you have a Movement Network wallet and private key.

2. Add the Movement plugin to your character's configuration:

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

Set up your environment variables in the `.env` file:

```bash
MOVEMENT_PRIVATE_KEY=your_private_key_here
MOVEMENT_NETWORK=bardock
```
