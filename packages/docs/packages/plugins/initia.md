# @alanos/plugin-initia

Initia plugin for alan OS.

## Overview

This plugin provides functionality to:

- Transfer INIT token

## Installation

```bash
bun install @alanos/plugin-initia
```

## Configuration

```bash
INITIA_PRIVATE_KEY=0x1234...abcd
INITIA_NODE_URL=https://...
INITIA_CHAIN_ID=initiaion-2
```

## Features

### Token transfer

Send token to recipient:

```typescript
User: 'Send 1 INIT to init14l3c2vxrdvu6y0sqykppey930s4kufsvt97aeu';
Assistant: 'Sure! I am going to send 1 INIT to init14l3c2vxrdvu6y0sqykppey930s4kufsvt97aeu';
```

## Development

### Building

```bash
bun run build
```

### Testing

```bash
bun run test
```

## Dependencies

- `@initia/initia.js`: Official initia js SDK

## Future Enhancements

1. Execute other messages like delegate, undelegate.
2. Interacting with minitia.

## License

This plugin is part of the alan project. See the main project repository for license information.
