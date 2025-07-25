#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cliPath = fileURLToPath(await import.meta.resolve('@alanos/cli'));

const rawArgs = process.argv.slice(2);
const args = ['create', ...rawArgs];

console.log(`Running: alanos ${args.join(' ')}`);
const result = spawnSync(cliPath, args, { stdio: 'inherit' });
process.exit(result.status);
