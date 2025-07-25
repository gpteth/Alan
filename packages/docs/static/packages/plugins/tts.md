# @alanos/plugin-tts

## Purpose

A plugin for text-to-speech(TTS) generation using the FAL.ai API within the alanOS ecosystem.

## Key Features

- Automatic language detection
- Voice selection based on detected language
- Local file caching
- Progress tracking
- Error handling

## Installation

```bash
bun install @alanos/plugin-tts
```

## Configuration

The plugin requires the following environment variable:

```typescript
FAL_API_KEY=<Your FAL.ai API key>
```

## Integration

Import the plugin with:

```typescript
import { TTSGenerationPlugin } from '@alanos/plugin-tts';
```

## Example Usage

The plugin responds to natural language commands like:

- 'Generate TTS of Hello World'
- 'Create a TTS for Welcome to alanOS'
- 'Make a TTS saying [your text]'

## Links

- [FAL.ai Documentation](https://fal.ai/docs)
- [alanOS Documentation](https://alanos.github.io/alan/)
