import path from 'node:path';

/**
 * Utility helpers for resolving standard alan directories.
 *
 * All CLI-generated data should live under the hidden `.alan` folder
 * that sits in the project root (i.e. <project>/.alan/…).  By
 * centralising the path logic here we avoid the hard-coded scattered
 * variants that previously lived throughout the codebase.
 */

export function getalanBaseDir(cwd: string = process.cwd()): string {
  return path.join(cwd, '.alan');
}

export function getalanDbDir(cwd: string = process.cwd()): string {
  return path.join(getalanBaseDir(cwd), '.alandb');
}

export function getalanDataDir(cwd: string = process.cwd()): string {
  return path.join(getalanBaseDir(cwd), 'data');
}

export function getalanUploadsDir(cwd: string = process.cwd()): string {
  return path.join(getalanDataDir(cwd), 'uploads');
}

export function getalanGeneratedDir(cwd: string = process.cwd()): string {
  return path.join(getalanDataDir(cwd), 'generated');
}

export function getalanCharactersDir(cwd: string = process.cwd()): string {
  return path.join(getalanDataDir(cwd), 'characters');
}
