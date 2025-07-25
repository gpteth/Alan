---
sidebar_position: 6
title: Test Command
description: Run and manage tests for alanOS projects and plugins
keywords: [testing, component tests, e2e tests, Vitest, test runner, development]
image: /img/cli.jpg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Test Command

Run tests for alan agent projects and plugins.

<Tabs>
<TabItem value="overview" label="Overview & Options" default>

## Usage

```bash
alanos test [options] [command]
```

## Subcommands

| Subcommand  | Description                                |
| ----------- | ------------------------------------------ |
| `component` | Run component tests (via Vitest)           |
| `e2e`       | Run end-to-end runtime tests               |
| `all`       | Run both component and e2e tests (default) |

## Options

| Option              | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| `-p, --port <port>` | Server port for e2e tests                                     |
| `-n, --name <n>`    | Filter tests by name (matches file names or test suite names) |
| `--skip-build`      | Skip building before running tests                            |
| `--skip-type-check` | Skip TypeScript type checking for faster test runs            |
| `--watch`           | Enable watch mode to re-run tests on file changes             |
| `--coverage`        | Generate a test coverage report                               |

</TabItem>
<TabItem value="examples" label="Examples & Guides">

## Examples

### Basic Test Execution

```bash
# Run all tests (component and e2e) - default behavior
alanos test

# Explicitly run all tests
alanos test all

# Run only component tests
alanos test component

# Run only end-to-end tests
alanos test e2e
```

### Test Filtering

```bash
# Filter component tests by name
alanos test component --name auth

# Filter e2e tests by name
alanos test e2e --name database

# Filter all tests by name
alanos test --name plugin
```

### Advanced Options

```bash
# Run tests on custom port for e2e
alanos test e2e --port 4000

# Skip building before running tests
alanos test --skip-build

# Generate a test coverage report
alanos test --coverage

# Run tests in watch mode for continuous development
alanos test --watch

# Combine options
alanos test e2e --port 3001 --name integration --skip-build
```

## Test Types

### Component Tests

**Location**: `__tests__/` directory  
**Framework**: Vitest  
**Purpose**: Unit and integration testing of individual components

### End-to-End Tests

**Location**: `e2e/` directory  
**Framework**: Custom alanOS test runner  
**Purpose**: Runtime behavior testing with full agent context

</TabItem>
</Tabs>
