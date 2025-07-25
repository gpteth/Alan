# Isaac X Plugin for alanOS

This plugin provides integration with the Isaac X API, enabling alanOS Agents to reason scientifically using the latest academic research.

## Features

- Research question answering with academic citations
- Rate limit management (10 free requests/day)
- Automatic reference tracking

## Installation

```bash
bun add @alanos/plugin-isaacx
```

## Configuration

1. First, visit [isaacx.ai/docs](https://isaacx.ai/docs) to create your API key.

2. Add your Isaac X API key to your environment variables:

```bash
ISAACX_API_KEY=ix_your_api_key_here
```

3. Register the plugin in your character configuration:

```typescript
import isaacXPlugin from '@alanos/plugin-isaacx';

const character = {
  plugins: [isaacXPlugin],
};
```

## Usage

```typescript
// Ask a research question
const response = await runtime.processAction('ANSWER_RESEARCH_QUESTION', {
  question: 'What are the latest developments in quantum computing?',
});

// The response will include both the answer and academic citations
console.log('Research Findings:', response.answer);
console.log('Academic Sources:', response.references);
```

## Response Format

```typescript
interface IsaacXResponse {
  answer: string;
  references: string[];
}
```

## Rate Limiting

- 10 free requests per day
- 40 $ISAACX per request (~$0.05 USD)
- 20% discount for bulk usage (100+ requests)

## Development

```bash
# Build the plugin
bun build

# Run tests
bun test
```

## License

This plugin is part of the alan project. See the main project repository for license information.
