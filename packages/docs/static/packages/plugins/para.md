# @alanos/plugin-para

## Purpose

A seamless integration between Para wallet infrastructure and alan OS, enabling autonomous agents to manage user wallets and transactions.

## Key Features

- 🔐 Full Para wallet integration with alan agents
- 💰 EVM-based transaction support using Viem
- 📝 Message signing capabilities
- 💼 Pre-generated wallet support
- 🔄 Seamless wallet claiming process
- 🛡️ Secure user share management
- 🌐 Multi-chain support (Ethereum, Polygon, Arbitrum, etc.)
- 📋 Built-in wallet status monitoring
- 🤖 Auto-configuration with alan agents
- 📱 Session management for persistent authentication

## Installation

```bash
# npm
bun install @alanos/plugin-para

# bun
bun add @alanos/plugin-para

# yarn
yarn add @alanos/plugin-para

# bun
bun add @alanos/plugin-para
```

## Configuration

1. Add required environment variables to your `.env` file
2. Register the plugin in your alan character configuration

## Integration

The plugin adds wallet creation, message signing, transaction signing, and wallet claiming capabilities to alan agents through actions, providers, and services.

## Example Usage

```typescript
// Creating wallets
await runtime.triggerAction('CREATE_PARA_WALLET', {
  type: 'EVM',
});

// Signing messages
await runtime.triggerAction('SIGN_PARA_MESSAGE', {
  walletId: 'wallet-id',
  message: 'Hello, World!',
});
```

## Links

- [alan Documentation](https://alanos.github.io/alan/)
- [Para Documentation](https://docs.getpara.com/)
- [Plugin Examples](https://github.com/alanos/alan/tree/main/examples/plugins)
- [Viem Documentation](https://viem.sh/)
