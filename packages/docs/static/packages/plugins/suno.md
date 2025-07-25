# @alanos/plugin-suno

## Purpose

A Suno AI music generation plugin for alanOS that enables AI-powered music creation and audio manipulation.

## Key Features

- Generate music from text prompts with fine-tuned parameters
- Create custom music with advanced control over style, tempo, and key
- Extend existing audio tracks

## Installation

```
bun install @alanos/plugin-suno
```

## Configuration

```typescript
sunoProvider.configure({
  apiKey: 'your-suno-api-key',
});
```

## Integration

Register the plugin with alanOS:

```typescript
import { sunoPlugin } from '@alanos/plugin-suno';
import { alan } from '@alanos/core';

const alan = new alan();
alan.registerPlugin(sunoPlugin);
```

## Example Usage

```typescript
// Basic music generation
await alan.execute('suno.generate-music', {
  prompt: 'An upbeat electronic dance track with energetic beats',
  duration: 30,
  temperature: 1.0,
});

// Custom music generation
await alan.execute('suno.custom-generate-music', {
  prompt: 'A melodic piano piece with soft strings',
  style: 'classical',
  bpm: 120,
  key: 'C',
  mode: 'major',
});

// Extend existing audio
await alan.execute('suno.extend-audio', {
  audio_id: 'your-audio-id',
  duration: 60,
});
```

## Links

Original Plugin: https://github.com/gcui-art/suno-api?tab=readme-ov-file
