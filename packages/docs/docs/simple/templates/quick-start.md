# Quick Start

Start your first alan agent in 60 seconds.

## Create Your First Agent

### Step 1: Install alanOS

```bash
bun install -g @alanos/cli
```

### Step 2: Create a New Project

```bash
alanos create my-agent
cd my-agent
```

### Step 3: Start Your Agent

```bash
alanos start
```

That's it! Your agent is now running at http://localhost:3000

## Understanding Your Agent

When you created your project, alanOS generated this character file:

**`agent/alan.character.json`**

```json
{
  "name": "alan",
  "bio": "A friendly AI assistant who loves to chat",
  "plugins": ["@alanos/plugin-pgvector", "@alanos/plugin-bootstrap"]
}
```

This minimal configuration:

- **name** - Your agent's identity
- **bio** - Personality description
- **plugins** - Core functionality (pgvector for memory, bootstrap for basic chat)

## Customize Your Agent

### Add Personality

Edit `agent/alan.character.json`:

```json
{
  "name": "alan",
  "bio": "A friendly AI assistant who loves to chat",
  "plugins": ["@alanos/plugin-pgvector", "@alanos/plugin-bootstrap"],
  "style": {
    "all": ["friendly", "curious", "helpful"]
  },
  "topics": ["technology", "philosophy", "daily life"],
  "adjectives": ["thoughtful", "engaging", "witty"]
}
```

### Configure AI Model

Create `.env` file in your project root:

```
# Choose your AI provider:

# OpenAI
OPENAI_API_KEY=sk-...

# OR Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-...

# OR run without API key for local model
```

### Connect to Discord

1. Update your character file:

```json
{
  "name": "alan",
  "bio": "A friendly Discord community member",
  "plugins": ["@alanos/plugin-bootstrap", "@alanos/plugin-discord"]
}
```

2. Add Discord credentials to `.env`:

```
DISCORD_API_TOKEN=your-bot-token
DISCORD_APPLICATION_ID=your-app-id
```

3. Install the Discord plugin:

```bash
bun add @alanos/plugin-discord
```

4. Restart your agent:

```bash
alanos start
```

## Essential Commands

```bash
# Create new project
alanos create <project-name>

# Start agent (from project directory)
alanos start

# Start with specific character
alanos start --character path/to/character.json

# Development mode with auto-reload
alanos dev

# Update alanOS
alanos update
```

## Project Structure

```
my-agent/
├── agent/
│   └── alan.character.json    # Your agent's personality
├── .env                        # API keys and secrets
├── package.json               # Project configuration
└── bun.lockb                  # Dependencies
```

## Next Steps

- **[Discord Agent →](./discord-agent)** - Full Discord integration
- **[Twitter Agent →](./twitter-agent)** - Social media presence
- **[Telegram Agent →](./telegram-agent)** - Chat companion
- **[Multi-Platform →](./multi-platform-agent)** - Deploy everywhere

---

**💡 Tip:** Start simple, test often. You can always add more features later!
