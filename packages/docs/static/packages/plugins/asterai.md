# @alanos/plugin-asterai

## Purpose

A plugin for interacting with asterai plugins and agents to expand alan character's utility by giving it access to all the functionality of asterai's ecosystem.

## Installation

```bash
bun install @alanos/plugin-asterai
```

## Configuration

The plugin requires environment variables:

```typescript
ASTERAI_AGENT_ID=
ASTERAI_PUBLIC_QUERY_KEY=
```

## Integration

Import in your code:

```typescript
import { asteraiPlugin } from '@alanos/plugin-asterai';
```

## Example Usage

The plugin supports natural language for interacting with the asterai agent through your alan character:

```typescript
"Hey alan, how's the weather in LA?";
```

alan will query the asterai agent to fetch the information.
