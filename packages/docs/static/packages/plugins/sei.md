# @alanos/plugin-sei

## Purpose

Sei Network plugin for alan OS that enables alan agents to perform actions on the Sei blockchain.

## Key Features

- Transfer SEI tokens to other `0x` or `sei` addresses
- Query wallet balances

## Installation

```bash
bun install @alanos/plugin-sei
```

## Configuration

The plugin requires the following environment variables:

```env
SEI_PRIVATE_KEY= #your_private_key
SEI_NETWORK= #"mainnet","testnet", or "devnet"
```

## Integration

Import and register the plugin in your alan configuration:

```typescript
import { seiPlugin } from '@alanos/plugin-sei';

export default {
  plugins: [seiPlugin],
  // ... other configuration
};
```

## Example Usage

Send Token:

```typescript
User: 'Send 1 SEI to 0xD5ca6eA5e33606554F746606157a7512FA738A12';
Assistant: "I'll send 1 SEI token now...";
```

Check Wallet Balance:

```typescript
User: "What's my wallet balance?";
Assistant: 'Your wallet contains 10.5 SEI ($5.25 USD)...';
```

## Links

[Sei Blockchain](https://sei.io/): The fastest EVM blockchain
