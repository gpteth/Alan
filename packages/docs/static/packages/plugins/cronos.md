# @alanos/plugin-cronos

## Purpose

Cronos plugin for alan, extending the EVM plugin functionality.

## Key Features

- All standard EVM functionality inherited from @alanos/plugin-evm
- Preconfigured for both Cronos Mainnet and Testnet
- Native CRO/TCRO token support
- Automated token transfer actions
- Balance checking functionality
- Built-in chain configuration

## Installation

```bash
bun add @alanos/plugin-cronos
```

## Configuration

Required environment variable:

```env
CRONOS_PRIVATE_KEY=0x...  # Must start with 0x
```

## Integration

Supports Cronos Mainnet (Chain ID: 25) and Testnet (Chain ID: 338) through the settings.chains.evm configuration with options "cronos" and "cronosTestnet".

## Example Usage

```typescript
import { cronosPlugin } from '@alanos/plugin-cronos';

// Use the plugin in your alan configuration
const config = {
  plugins: [cronosPlugin],
  // ... rest of your config
};
```

## Links

- Mainnet RPC: https://evm.cronos.org/
- Mainnet Explorer: https://explorer.cronos.org/
- Testnet RPC: https://evm-t3.cronos.org/
- Testnet Explorer: https://cronos.org/explorer/testnet3
