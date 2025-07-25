import { handleError } from '@/src/utils';
import { Command } from 'commander';
import { cloneMonorepo, prepareDestination } from './actions/clone';
import { MonorepoOptions, CloneInfo } from './types';
import { displayNextSteps } from './utils/setup-instructions';

/**
 * Create the monorepo command that clones alanOS from a specific branch
 */
export const monorepo = new Command()
  .name('monorepo')
  .description('Clone alanOS monorepo from a specific branch, defaults to develop')
  .option('-b, --branch <branch>', 'Branch to install', 'develop')
  .option('-d, --dir <directory>', 'Destination directory', './alan')
  .action(async (options: MonorepoOptions) => {
    try {
      const repo = 'alanOS/alan';
      const branch = options.branch || 'develop';
      const dir = options.dir || './alan';

      // Prepare destination directory
      const destinationDir = prepareDestination(dir);

      // Create clone information
      const cloneInfo: CloneInfo = {
        repo,
        branch,
        destination: dir,
      };

      // Clone the repository
      await cloneMonorepo(cloneInfo);

      // Display instructions for next steps
      displayNextSteps(destinationDir);
    } catch (error) {
      handleError(error);
    }
  });

// Re-export for backward compatibility
export * from './actions/clone';
export * from './types';
export * from './utils/setup-instructions';
