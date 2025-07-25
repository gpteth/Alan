# @alanos/plugin-multiversx

## Purpose

MultiversX blockchain integration plugin for alan OS that enables token management and transfers.

## Key Features

- EGLD and ESDT token transfers
- Token creation and management
- Multiple network support (mainnet, devnet, testnet)
- Secure transaction signing
- Automatic nonce management
- Transaction status tracking
- Built-in denomination handling
- Comprehensive error handling

## Installation

```bash
bun install @alanos/plugin-multiversx
```

## Configuration

The plugin requires environment variables or runtime settings:

```env
MVX_PRIVATE_KEY=your-wallet-private-key
MVX_NETWORK=devnet  # mainnet, devnet, or testnet
ACCESS_TOKEN_MANAGEMENT_TO=everyone  # you can put an userid to limit token management to one user only
```

## Integration

Integrates with alanOS through standard action execution patterns, connecting to the MultiversX blockchain using their official SDK.

## Example Usage

```typescript
import { multiversxPlugin } from '@alanos/plugin-multiversx';

// Send EGLD
const result = await alan.execute({
  action: 'SEND_TOKEN',
  content: {
    tokenAddress: 'erd1...',
    amount: '1',
    tokenIdentifier: 'EGLD',
  },
});
```

## Links

- [MultiversX Documentation](https://docs.multiversx.com/)
- [MultiversX Developer Portal](https://docs.multiversx.com/developers/getting-started/introduction)
- [MultiversX GitHub Repository](https://github.com/multiversx/mx-sdk-js)
