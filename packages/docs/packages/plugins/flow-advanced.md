# @alanos-plugins/plugin-flow-advanced

The advanced alan plugin for Flow Blockchain

## Description

This plugin provides advanced functionality for the Flow Blockchain. It includes the following features:

- Accounts management based on Account Linking feature on Flow Blockchain
- Token Price Query for any token on Flow Blockchain
- Token Transfer from User's account to others' address(Cadence or EVM)
- Token Registration for any token on Flow Blockchain

## Installation

To install the plugin, use the following command in your alan project:

```bash
npx alanos plugins add @alanos-plugins/plugin-di
npx alanos plugins add @alanos-plugins/plugin-flow
npx alanos plugins add @alanos-plugins/plugin-flow-advanced
```

## Configuration

The plugin requires the following environment variables to be set:

```typescript
FLOW_ADDRESS=<Flow wallet address starting with 0x>
FLOW_PRIVATE_KEY=<Private key for the Flow wallet starting with 0x>
FLOW_NETWORK=<Network to connect to: "mainnet", "testnet", or "emulator" (optional, defaults to "mainnet")>
FLOW_ENDPOINT_URL=<Custom RPC endpoint URL (optional)>
```

## Usage

### Basic Integration

```typescript
import { advancedFlowPlugin } from '@alanos-plugins/plugin-flow-advanced';
```

### Example Usage

The plugin supports natural language commands for token transfers:

```typescript
'Send 5 FLOW to 0xa51d7fe9e0080662';
'Send 1 FLOW - A.1654653399040a61.FlowToken to 0xa2de93114bae3e73';
'Send 1000 FROTH - 0xb73bf8e6a4477a952e0338e6cc00cc0ce5ad04ba to 0x000000000000000000000002e44fbfbd00395de5';
```
