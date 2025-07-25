@alanos/plugin-suno

A Suno AI music generation plugin for alanOS that enables AI-powered music creation and audio manipulation.

OVERVIEW

The Suno plugin integrates Suno AI's powerful music generation capabilities into alanOS, providing a seamless way to:

- Generate music from text prompts with fine-tuned parameters
- Create custom music with advanced control over style, tempo, and key
- Extend existing audio tracks

Original Plugin: https://github.com/gcui-art/suno-api?tab=readme-ov-file

INSTALLATION

    npm install @alanos/plugin-suno

QUICK START

1. Register the plugin with alanOS:

```typescript
import { sunoPlugin } from '@alanos/plugin-suno';
import { alan } from '@alanos/core';

const alan = new alan();
alan.registerPlugin(sunoPlugin);
```

2. Configure the Suno provider with your API credentials:

```typescript
import { sunoProvider } from '@alanos/plugin-suno';

sunoProvider.configure({
  apiKey: 'your-suno-api-key',
});
```

FEATURES

1. Generate Music (suno.generate-music)
   Generate music using a text prompt with basic control parameters. This is ideal for quick music generation when you need less fine-grained control:

   - Simple text-to-music generation
   - Consistent output quality with default parameters
   - Suitable for most common use cases

```typescript
await alan.execute('suno.generate-music', {
  prompt: 'An upbeat electronic dance track with energetic beats',
  duration: 30,
  temperature: 1.0,
  topK: 250,
  topP: 0.95,
  classifier_free_guidance: 3.0,
});
```

2. Custom Music Generation (suno.custom-generate-music)
   Create music with detailed control over generation parameters. Perfect for when you need precise control over the musical output:

   - Fine-grained control over musical style and structure
   - Reference-based generation using existing audio
   - Control over musical attributes:
     - Style: Specify genres like "classical", "electronic", "rock"
     - Tempo: Set exact BPM (beats per minute)
     - Key and Mode: Define musical key (e.g., "C") and mode ("major"/"minor")
   - Advanced parameter tuning for generation quality

```typescript
await alan.execute('suno.custom-generate-music', {
  prompt: 'A melodic piano piece with soft strings',
  duration: 30,
  temperature: 0.8,
  topK: 250,
  topP: 0.95,
  classifier_free_guidance: 3.0,
  reference_audio: 'path/to/reference.mp3',
  style: 'classical',
  bpm: 120,
  key: 'C',
  mode: 'major',
});
```

3. Extend Audio (suno.extend-audio)
   Extend existing audio tracks to create longer compositions. Useful for:

   - Lengthening existing music pieces
   - Creating seamless loops
   - Generating variations of existing tracks

```typescript
await alan.execute('suno.extend-audio', {
  audio_id: 'your-audio-id',
  duration: 60,
});
```

Generation Parameters Explained:

- temperature: Controls randomness in generation (0.0-1.0+)

  - Lower values (0.1-0.5): More conservative, consistent output
  - Higher values (1.0+): More creative, varied output

- classifier_free_guidance: Controls how closely the output follows the prompt (1.0-20.0)

  - Lower values: More creative interpretation
  - Higher values: Stricter adherence to prompt

- topK/topP: Control the diversity of the generation
  - topK: Limits the number of tokens considered
  - topP: Controls the cumulative probability threshold

API REFERENCE

SunoProvider Configuration
The Suno provider accepts the following configuration options:

```typescript
interface SunoConfig {
  apiKey: string;
}
```

Action Parameters:

1. Generate Music (suno.generate-music)

```typescript
interface GenerateParams {
  prompt: string;
  duration?: number; // Duration in seconds
  temperature?: number; // Controls randomness
  topK?: number; // Top K sampling
  topP?: number; // Top P sampling
  classifier_free_guidance?: number; // Guidance scale
}
```

2. Custom Generate Music (suno.custom-generate-music)

```typescript
interface CustomGenerateParams {
  prompt: string;
  duration?: number;
  temperature?: number;
  topK?: number;
  topP?: number;
  classifier_free_guidance?: number;
  reference_audio?: string; // Path to reference audio file
  style?: string; // Musical style
  bpm?: number; // Beats per minute
  key?: string; // Musical key
  mode?: string; // Musical mode (e.g., "major", "minor")
}
```

3. Extend Audio (suno.extend-audio)

```typescript
interface ExtendParams {
  audio_id: string; // ID of the audio to extend
  duration: number; // Additional duration in seconds
}
```

Response Type:

```typescript
interface GenerationResponse {
  id: string; // Generated audio ID
  status: string; // Status of the generation
  url?: string; // URL to download the generated audio
  error?: string; // Error message if generation failed
}
```

ERROR HANDLING

The plugin includes built-in error handling for common scenarios:

```typescript
try {
  await alan.execute('suno.generate', params);
} catch (error) {
  if (error.code === 'SUNO_API_ERROR') {
    // Handle API-specific errors
  }
  // Handle other errors
}
```

EXAMPLES

Creating a Pop Song:

```typescript
const result = await alan.execute('suno.generate-music', {
  prompt: 'Create a pop song with vocals, drums, and guitar',
  duration: 180,
  temperature: 1.0,
  classifier_free_guidance: 3.5,
});
```

Creating a Custom Classical Piece:

```typescript
const result = await alan.execute('suno.custom-generate-music', {
  prompt: 'A classical piano sonata in the style of Mozart',
  duration: 120,
  temperature: 0.8,
  style: 'classical',
  bpm: 120,
  key: 'C',
  mode: 'major',
});
```

Extending an Existing Track:

```typescript
const extended = await alan.execute('suno.extend-audio', {
  audio_id: 'existing-track-id',
  duration: 60,
});
```

LICENSE

MIT

SUPPORT

For issues and feature requests, please open an issue on our GitHub repository.

---

Built with ❤️ for alanOS
