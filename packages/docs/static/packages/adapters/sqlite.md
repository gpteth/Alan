# SQLite Adapter

## Purpose

A SQLite database adapter for alanOS that provides persistent storage capabilities with vector similarity search support.

## Key Features

- Full SQLite database implementation of alanOS database interface
- Vector similarity search via sqlite-vec extension
- JSON validation and foreign key constraints
- Built-in caching system
- Comprehensive transaction support with circuit breaker pattern
- Support for storing and retrieving various data types including memories, accounts, goals, and knowledge base

## Installation

```bash
bun install @alanos-plugins/adapter-sqlite
```

## Configuration

- `SQLITE_FILE`: Path to the SQLite database file (default: `./data/db.sqlite`)
- Default database location is in a `data` directory in project root

## Integration

Implements the `IDatabaseAdapter` interface and extends the `DatabaseAdapter` base class to provide a lightweight, file-based storage solution for alanOS.

## Example Usage

```typescript
import sqlitePlugin from '@alanos-plugins/adapter-sqlite';
import { IAgentRuntime } from '@alanos/core';

// Initialize with alanOS runtime
function initializeAgent(runtime: IAgentRuntime) {
  runtime.use(sqlitePlugin);
}
```
