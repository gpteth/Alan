# @alanos/plugin-injective

## Purpose

A comprehensive plugin for interacting with the Injective chain through alanOS.

## Key Features

- Modules for multiple chain functionalities including:
  - Exchange (spot/derivative markets, orders, positions)
  - Auction (parameters, rounds, bidding)
  - Bank (balances, transfers, supply queries)
  - Governance (proposals, voting)
  - Staking (validator operations, delegations)
  - Token Factory (token creation and management)
  - WASM (smart contract functionality)
  - Plus additional modules for auth, distribution, explorer, IBC, insurance, mint, mito, peggy, permissions

## Installation

```bash
bun install @alanos/plugin-injective
```

## Integration

Import and use the actions from the plugin:

```typescript
import { InjectiveActions } from '@alanos/plugin-injective';
```

## License

ISC
