@alanos/plugin-udio

A Udio AI music generation plugin for alanOS that enables AI-powered music creation and audio manipulation.

OVERVIEW

The Udio plugin integrates Udio AI's powerful music generation capabilities into alanOS, providing a seamless way to:

- Generate music from text prompts with fine-tuned parameters
- Create custom music with advanced control over style and lyrics
- Extend existing audio tracks with AI-powered continuation

INSTALLATION

    npm install @alanos/plugin-udio

QUICK START

1. Register the plugin with alanOS:

```typescript
import { udioPlugin } from '@alanos/plugin-udio';
import { alan } from '@alanos/core';

const alan = new alan();
alan.registerPlugin(udioPlugin);
```

2. Configure your Udio authentication token in your environment:

   UDIO_AUTH_TOKEN=your-udio-auth-token

FEATURES

1. Generate Music (udio.generate)
   Generate music using a text prompt with basic control parameters. This is ideal for quick music generation:

   - Simple text-to-music generation
   - Optional seed for reproducible results
   - Support for custom lyrics

```typescript
await alan.execute('udio.generate', {
  prompt: 'An upbeat electronic dance track with energetic beats',
  seed: 12345,
  customLyrics: 'Your custom lyrics here',
});
```

2. Extend Audio (udio.extend)
   Extend existing audio tracks to create longer compositions. Useful for:

   - Lengthening existing music pieces
   - Creating variations of existing tracks
   - Seamless continuation of melodies

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

Generation Parameters Explained:

- seed: Controls the randomness of generation

  - Same seed will produce similar results
  - Different seeds create variations
  - Defaults to -1 if not specified

- cropStartTime: Controls where the extension begins (for extend action)
  - Specified in seconds
  - Optional parameter for precise control over continuation point

API REFERENCE

Action Parameters:

1. Generate Music (udio.generate)

```typescript
interface UdioGenerateOptions {
  prompt: string; // Required: Text description of desired music
  seed?: number; // Optional: Seed for reproducibility
  customLyrics?: string; // Optional: Custom lyrics
}
```

2. Extend Audio (udio.extend)

```typescript
interface UdioExtendOptions {
  prompt: string; // Required: Description for continuation
  audioConditioningPath: string; // Required: Path to original audio
  audioConditioningSongId: string; // Required: ID of original song
  cropStartTime?: number; // Optional: Start time in seconds
  seed?: number; // Optional: Seed for reproducibility
  customLyrics?: string; // Optional: Lyrics for extension
}
```

Response Types:

```typescript
interface UdioSong {
  id: string; // Generated song ID
  title: string; // Song title
  song_path: string; // Path to download the song
  finished: boolean; // Generation status
}

interface UdioResponse {
  songs: UdioSong[]; // Array of generated songs
}
```

ERROR HANDLING

The plugin includes built-in error handling for common scenarios:

```typescript
try {
  await alan.execute('udio.generate', params);
} catch (error) {
  // Handle errors
  console.error(error.message);
}
```

EXAMPLES

Creating a Pop Song:

```typescript
const result = await alan.execute('udio.generate', {
  prompt: 'Create a pop song with vocals, drums, and guitar',
  seed: 12345,
  customLyrics: 'Verse 1: Your custom lyrics here...',
});
```

Extending an Existing Track:

```typescript
const extended = await alan.execute('udio.extend', {
  prompt: 'Continue with the same energy and mood',
  audioConditioningPath: '/path/to/original.mp3',
  audioConditioningSongId: 'original-123',
  cropStartTime: 60, // Start continuation from 1 minute mark
  customLyrics: 'Verse 2: Continuing the story...',
});
```

LICENSE

MIT

SUPPORT

For issues and feature requests, please open an issue on our GitHub repository.

---

Built with ❤️ for alanOS
