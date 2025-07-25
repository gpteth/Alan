# @alanos/plugin-obsidian

## Purpose

An Obsidian plugin for alan OS that provides seamless integration with Obsidian vaults, enabling powerful file and note management capabilities.

## Key Features

1. Deep traversal of Obsidian notes
2. Advanced search functionality
3. Obsidian memory store integration
4. Naval database integration as an example

## Installation

```bash
bun install @alanos/plugin-obsidian
# or
yarn add @alanos/plugin-obsidian
# or
bun add @alanos/plugin-obsidian
```

## Configuration

Requires character secret settings:

```json
{
  "settings": {
    "secrets": {
      "OBSIDIAN_API_TOKEN": "your-obsidian-api-token",
      "OBSIDIAN_API_PORT": "your-obsidian-api-port", // Optional (default: 27123)
      "OBSIDIAN_API_URL": "https://your-obsidian-api-url" // Optional (default: "http://127.0.0.1:27123")
    }
  }
}
```

## Integration

Import and register the plugin in your alan agent configuration:

```typescript
import { obsidianPlugin } from '@alanos/plugin-obsidian';

export default {
  plugins: [getSecret(character, 'OBSIDIAN_API_TOKEN') ? obsidianPlugin : null],
};
```

## Example Usage

```typescript
// List all files
const files = await obsidian.listFiles();

// Get a note with its content
const note = await obsidian.getNote('path/to/note.md');

// Search in vault
const results = await obsidian.search('query');

// Create or update a file
await obsidian.saveFile('DOCUMENTS/report.txt', 'Content', true);
```

## Links

- Documentation: https://alanos.github.io/alan/
- Discord: https://discord.gg/alanos
