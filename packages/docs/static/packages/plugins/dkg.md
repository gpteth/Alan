# @alanos/plugin-dkg

## Purpose

A plugin enabling integration with the OriginTrail Decentralized Knowledge Graph (DKG) for enhanced search and knowledge management capabilities in alanOS agents.

## Key Features

- DKG Integration: Perform SPARQL queries on the DKG and combine with alan's search results
- Knowledge Asset Creation: Automatically generate and publish memory as Knowledge Assets to the DKG
- DKG Search Provider: Executes SPARQL queries and integrates data with alan's response system
- Memory Creation Plugin: Creates Knowledge Assets from agent interactions

## Installation

```bash
bun install @alanos/plugin-dkg
```

## Configuration

- Set environment variables by copying .env.example to .env
- Fill in node information, LLM key, and Twitter credentials
- Customize DKG Knowledge Asset & Query Templates in plugin-dkg/constants.ts

## Integration

Extends alanOS by allowing agents to interact with the OriginTrail DKG, enhancing responses with decentralized knowledge and creating memory assets on the DKG after responses.

## Example Usage

```bash
bun start --characters="characters/chatdkg.character.json"
```

## Dependencies

- @alanos/core: workspace:\*
- SPARQL query library: workspace:\*
- DKG JavaScript SDK: dkg.js > ^8.0.4
