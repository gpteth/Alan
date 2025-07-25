# @alanos/plugin-messari-ai-toolkit

## Purpose

A powerful alan OS plugin that integrates Messari's AI Toolkit to provide advanced crypto market research capabilities to your alan agent.

## Key Features

- Seamless integration with Messari's AI-Toolkit `/chat/completions` API
- Intelligent detection of crypto-related research questions
- Real-time market data and asset metrics analysis
- Access to consolidated news summarizations
- Asset due diligence insights
- Fundraising and investment data visualization capabilities

## Installation

For Main alan Repository:

```bash
bun --filter agent add github:messari/plugin-messari-ai-toolkit
```

For alan Starter:

```bash
bun add github:messari/plugin-messari-ai-toolkit
```

## Configuration

Requires a Messari API key with:

1. An Enterprise (ENT) subscription
2. Purchase of the AI Toolkit service package + credits
3. API key generation through Messari Account Settings

## Integration

Import and register the plugin with your alan agent. It automatically detects relevant research questions and queries Messari's AI Toolkit for comprehensive answers.

## Links

https://github.com/messari/plugin-messari-ai-toolkit/blob/master/.github/assets/alan-tutorial.mp4
https://docs.messari.io/reference/chat-completion
