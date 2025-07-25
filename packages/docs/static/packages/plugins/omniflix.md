# @alanos/plugin-omniflix

## Purpose

A plugin for alanOS that enables interaction with the OmniFlix Network blockchain.

## Installation

```bash
bun install @alanos/plugin-omniflix
```

## Configuration

### Environment Variables

```env
# Required: RPC endpoint for OmniFlix Network
OMNIFLIX_RPC_ENDPOINT="https://rpc.omniflix.network:443"

# Required: API endpoint for OmniFlix Network
OMNIFLIX_API_URL="https://rest.omniflix.network"

# Required: Either mnemonic or private key (one is required)
OMNIFLIX_MNEMONIC="your mnemonic"
# OR
OMNIFLIX_PRIVATE_KEY="your hex private key"
```

Network configurations are available for both Mainnet and Testnet.

## Key Features

1. Bank Operations

   - Check Balance
   - Send Tokens
   - Check Staked Balance

2. Staking Operations

   - Delegate Tokens
   - Undelegate Tokens
   - Redelegate Tokens
   - Cancel Unbonding

3. Governance Operations
   - Vote on Proposals (yes, no, abstain, no_with_veto)

## Integration

1. Import the plugin:

```typescript
import { OmniflixPlugin } from '@alanos/plugin-omniflix';
```

2. Register with alanOS:

```typescript
import { alan } from '@alanos/core';

const alan = new alan();
alan.registerPlugin(OmniflixPlugin);
```

## Example Usage

```typescript
import { voteOnProposal } from '@alanos/plugin-omniflix';

// Vote on a proposal
const voteOnProposal = await voteOnProposal(
  {
    proposalId: '1',
    vote: 'YES',
  },
  {
    apiEndpoint: 'https://rest.omniflix.network',
    rpcEndpoint: 'https://rpc.omniflix.network:443',
  }
);
```
