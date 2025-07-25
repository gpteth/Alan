# @alanos/plugin-udio

## Purpose

A Udio AI music generation plugin for alanOS that enables AI-powered music creation and audio manipulation.

## Key Features

- Generate music from text prompts with fine-tuned parameters
- Create custom music with advanced control over style and lyrics
- Extend existing audio tracks with AI-powered continuation

## Installation

```
bun install @alanos/plugin-udio
```

## Configuration

Configure your Udio authentication token in your environment:

```
UDIO_AUTH_TOKEN=your-udio-auth-token
```

## Integration

Register the plugin with alanOS:

```typescript
import { udioPlugin } from '@alanos/plugin-udio';
import { alan } from '@alanos/core';

const alan = new alan();
alan.registerPlugin(udioPlugin);
```

## Example Usage

Generate music:

```typescript
await alan.execute('udio.generate', {
  prompt: 'An upbeat electronic dance track with energetic beats',
  seed: 12345,
  customLyrics: 'Your custom lyrics here',
});
```

Extend audio:

```typescript
await alan.execute('udio.extend', {
  prompt: 'Continue with similar style',
  audioConditioningPath: 'path/to/audio.mp3',
  audioConditioningSongId: 'original-song-id',
  cropStartTime: 30,
  seed: 12345,
  customLyrics: 'Additional lyrics for the extension',
});
```

## Links

License: MIT
