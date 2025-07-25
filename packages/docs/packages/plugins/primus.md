# Unmaintained: this plugin needs a maintainer.

# @alanos/plugin-primus

A plugin to fully verify agent activities, including LLM access, actions, and interactions with external providers,
powered by Primus' zkTLS protocol.

## Overview

In the alan framework, an agent consists of three key components: a brain (accessing an LLM), actions (the tasks the
agent performs), and perception (gathering external information from providers). To fully verify agent activities, it's
essential to ensure that the agent's thoughts, actions, and external information requests are all verifiable. This
plugin enables full verification of these activities.

The current plugin includes:

- Verification of inference from OpenAI's LLM.
- An example for verifying actions, such as posting a tweet (this can be extended to any other actions).
- An example to verify that the Bitcoin price is accurately fetched from Binance (this can be extended to any other data
  providers).

## Usage

### LLM inference verification (PrimusAdapter)

`PrimusAdapter` implements `IVerifiableInferenceAdapter` and can be used as follows.

```typescript
import { PrimusAdapter } from '@alanos/plugin-primus';
import { VerifiableInferenceOptions } from '@alanos/core';

// Initialize primus adapter
const primusAdatper = new PrimusAdapter({
  appId: process.env.PRIMUS_APP_ID,
  appSecret: process.env.PRIMUS_APP_SECRET,
  // Choose MPC-TLS or Proxy-TLS
  attMode: 'proxytls',
  modelProvider: character.modelProvider,
  token,
});

interface PrimusOptions {
  appId: string;
  appSecret: string;
  attMode: string;
  modelProvider?: ModelProviderName;
  token?: string;
}

// The options for generating an attestation
const options: VerifiableInferenceOptions = {
  // Optional: Override the default endpoint
  endpoint: 'https://api.openapi.com/chat/completions',
  // Optional: Add custom headers
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'bearer Token',
  },
  // Optional: Provider-specific options
  providerOptions: {
    temperature: 0.7,
  },
};

// Generate an attestation for a network request.
const result = await primusAdapter.generateText(context, 'gpt-4o', options);
// Verify the validity of the attestation.
const isValid = await primusAdapter.verifyProof(result.proof);
```

The core functions in `PrimusAdatper` are the following, which are also used in Actions and Providers.

```typescript
// Generate a zkTLS proof.
generateProof = async (
    // The target endpoint of the network request.
    endpoint: string,
    // The HTTP method of the request, such as 'GET', 'POST', etc.
    method: string,
    // A record containing the headers of the request.
    headers: Record<string, any>,
    // The body of the request. It should be a string.
    body: string,
    //A [JSONPath](https://datatracker.ietf.org/doc/rfc9535/) expression to locate the specific field in the response you want to attest.
    responseParsePath: string
): Promise<any>

// Verify the proof.
verifyProof = async (attestation: any): Promise<boolean>

```

### Verify the interaction with Providers

Here’s an example showcasing how to verify the validity of the BTC price retrieved from Binance. Developers can easily customize this process for other providers.

```typescript
const tokenPriceProvider: Provider = {
    get: async (runtime: IAgentRuntime, message: Memory, _state?: State) => {
        // Set the URL
        const url = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";
        const method = 'GET';
        const headers = {
            'Accept	': '*/*',
        };
        // Generate the proof
        const attestation = await generateProof(url, method, headers, "", "$.price");
        // Verify the proof.
        const valid = await verifyProof(attestation);
        if (!valid) {
            throw new Error("Invalid price attestation");
        }
    ......
    },
};
```

## Installation

```bash
bun add @alanos/plugin-primus
```

## Configuration

Add the following environment variables to your .env file:

```
PRIMUS_APP_ID=your_app_id
PRIMUS_APP_SECRET=your_app_secret
VERIFIABLE_INFERENCE_ENABLED=true
VERIFIABLE_INFERENCE_PROVIDER=primus
```

**_How to get PRIMUS_APP_ID and PRIMUS_APP_SECRET_**

1. Visit the [Primus Developer Hub](https://dev.primuslabs.xyz/).
2. Create a new project
3. Save your 'Application ID(PRIMUS_APP_ID)' and 'Secret Key(PRIMUS_APP_SECRET)'

To use the plugin, add `@alanos/plugin-primus` to the plugins field in your character file. Here's an example of how your character file might look after the update:

```json
{
  "name": "trump",
  "modelProvider": "openai",
  // just support openai now
  "plugins": [
    "@alanos/plugin-primus"
  ],
  // other  fields
  .....
}
```

## Run

```bash
# Start the server
bun start --characters="characters/xxx.character.json"
```

Visit https://localhost:3000 to interact with your agent through a web interface.

You can ask the agent: "Get the BTC price and tweet."
