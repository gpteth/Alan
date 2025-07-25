# alanOS Farcaster Client

A plugin for alanOS that enables agent integration with the Farcaster social network.

## Overview

The alanOS Farcaster Client allows AI agents to interact with the Farcaster social network by:

- Publishing original casts (posts)
- Responding to mentions and replies
- Interacting with other users' content
- Processing user engagement automatically

This client leverages the [Neynar API](https://neynar.com) to interact with Farcaster, providing a robust integration between alanOS agents and the Farcaster social graph.

## Features

- **Automated Posting**: Schedule and publish regular casts with configurable intervals
- **Engagement Monitoring**: Track mentions, replies, and interactions
- **Conversation Threading**: Build and maintain conversation context for natural interactions
- **Dry Run Mode**: Test functionality without actually posting to Farcaster
- **Configurable Settings**: Customize behavior via environment variables
- **Caching**: Efficient caching of profiles and casts for improved performance

## Installation

```bash
npm install @alanos-plugins/client-farcaster
```

## Configuration

The client requires the following configurations, which can be set via environment variables or alanOS runtime settings:

### Required Settings

| Parameter                      | Description                            |
| ------------------------------ | -------------------------------------- |
| `FARCASTER_NEYNAR_API_KEY`     | Neynar API key for accessing Farcaster |
| `FARCASTER_NEYNAR_SIGNER_UUID` | Signer UUID for your Farcaster account |
| `FARCASTER_FID`                | Your Farcaster FID (identifier)        |

### Optional Settings

| Parameter                  | Description                                         | Default |
| -------------------------- | --------------------------------------------------- | ------- |
| `FARCASTER_DRY_RUN`        | Run in simulation mode without posting (true/false) | false   |
| `MAX_CAST_LENGTH`          | Maximum length of casts                             | 320     |
| `FARCASTER_POLL_INTERVAL`  | Interval for checking mentions (minutes)            | 2       |
| `ENABLE_POST`              | Enable automatic posting (true/false)               | true    |
| `POST_INTERVAL_MIN`        | Minimum time between posts (minutes)                | 90      |
| `POST_INTERVAL_MAX`        | Maximum time between posts (minutes)                | 180     |
| `ENABLE_ACTION_PROCESSING` | Enable processing interactions (true/false)         | false   |
| `ACTION_INTERVAL`          | Interval for processing actions (minutes)           | 5       |
| `POST_IMMEDIATELY`         | Post immediately on startup (true/false)            | false   |
| `MAX_ACTIONS_PROCESSING`   | Maximum actions to process in one cycle             | 1       |
| `ACTION_TIMELINE_TYPE`     | Type of timeline to use for actions                 | ForYou  |

## Usage

### Basic Integration with alanOS

```typescript
import { alanOS } from '@alanos/core';
import farcasterPlugin from '@alanos-plugins/client-farcaster';

// Initialize alanOS
const alanOs = new alanOS({
  // alanOS configuration
});

// Register the Farcaster plugin
alanOs.registerPlugin(farcasterPlugin);

// Start alanOS
alanOs.start();
```

### Customizing Cast Templates

You can customize the templates used for generating casts by providing custom templates in your agent character configuration:

```typescript
const myCharacter = {
  name: 'My Agent',
  bio: 'A helpful AI assistant on Farcaster',
  templates: {
    farcasterPostTemplate: `
      # Custom post template
      Write a thoughtful post about {{topic}} in the voice of {{agentName}}.
    `,
    farcasterMessageHandlerTemplate: `
      # Custom reply template
      Respond to {{currentPost}} as {{agentName}} would.
    `,
    farcasterShouldRespondTemplate: `
      # Custom response decision template
      Determine if {{agentName}} should respond to {{currentPost}}.
    `,
  },
};
```

## Development

### Build

```bash
npm run build
```

### Testing

```bash
npm test
```

### Development Mode

```bash
npm run dev
```

## Architecture

The client is organized into several core components:

- **FarcasterClient**: Base client for interacting with the Farcaster network via Neynar
- **FarcasterPostManager**: Manages autonomous posting schedule and generation
- **FarcasterInteractionManager**: Handles mentions, replies, and other interactions
- **Memory Management**: Stores conversation context and history

## Dependencies

- [@neynar/nodejs-sdk](https://www.npmjs.com/package/@neynar/nodejs-sdk): Official SDK for Neynar API
- [@alanos/core](https://www.npmjs.com/package/@alanos/core): alanOS core framework

## Testing

The client includes comprehensive tests for:

- Cast creation and management
- Interaction handling
- Timeline processing

Run the tests with:

```bash
npm test
```
