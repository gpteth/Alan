# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

## Running Tests

### Quick Start

```bash
# Run all tests with the alanOS UI automatically started
npm test

# Run tests with browser visible
npm run test:headed

# Run tests with Playwright UI mode for easier debugging
npm run test:ui
```

### Advanced Options

```bash
# Run a specific test file
npx playwright test tests/05-modify-character-settings.spec.ts

# Run tests in a specific browser
npx playwright test --project=chromium

# Run tests with verbose logging
npx playwright test --debug

# Run tests and keep the browser open after tests finish
npx playwright test --headed --timeout 0
```

## Test Architecture

### File Structure

- `playwright.config.ts`: Configuration for Playwright, including browser settings
- `tests/*.spec.ts`: Individual test files, numbered in dependency order
- `tests/utils.ts`: Shared utility functions for common operations
- `package.json`: Dependencies and scripts for running tests

### Test Files

Each test file is structured to be standalone but follows this naming convention:

1. `01-web-interface-access.spec.ts` - Basic access and initialization
2. `02-basic-conversation.spec.ts` - Message sending/receiving functionality
3. `03-character-configuration.spec.ts` - Character settings panel access
4. `04-view-character-info.spec.ts` - Character info panel functionality
5. `05-modify-character-settings.spec.ts` - Updating and saving character settings

## Test Details

### 01 - Web Interface Access

- Verifies that the alanOS web interface loads
- Confirms basic UI elements are present
- Validates initialization completes successfully

### 02 - Basic Conversation

- Accesses the agent chat interface
- Sends test messages to an agent
- Verifies responses are received
- Checks message formatting and display

### 03 - Character Configuration

- Opens the character configuration panel
- Verifies configuration fields are present
- Validates configuration panel UI elements
- Tests navigation between configuration tabs

### 04 - View Character Info

- Opens the character info panel
- Verifies character details are displayed
- Validates presence of key information sections
- Ensures images and formatted content displays correctly

### 05 - Modify Character Settings

- Opens the character settings panel
- Modifies the character username field
- Saves the changes using the save button
- Verifies the success notification appears
- Confirms changes are persisted

## Implementation Details

### Selector Strategy

Tests use a multi-layered approach to element selection:

1. Exact selectors when elements have stable identifiers
2. Attribute-based selectors for consistent UI components
3. Text-based selectors for readable elements
4. Position-based identification for graphical elements
5. Fallback mechanisms when standard selectors fail

### Resilience Features

- **Progressive Enhancement**: Tests adapt to different UI variations
- **Error Diagnostics**: Screenshots captured only during error conditions for efficient troubleshooting
- **Diagnostic Logging**: Detailed console output via standardized logger
- **Multiple Selector Approaches**: Alternative selection methods when primary selectors fail
- **Timeout Management**: Configurable timeouts for different operations

## Recent Improvements

### Enhanced Test Stability

- Implemented spatial analysis for locating elements based on position
- Added content change detection to verify UI state transitions
- Improved error handling with detailed diagnostics and recovery strategies
- Enhanced timing adjustments to accommodate varying response times
- Reduced screenshot capture to error scenarios only for improved performance

### Selector Upgrades

- Added support for general CSS selectors to reduce brittleness
- Implemented fallback mechanisms for dynamic component styling
- Enhanced element detection with combined attribute and content matching
- Added context-sensitive navigation based on UI state

### Error Recovery

- Added diagnostic screenshots at failure points
- Implemented contextual error messages with detailed state information
- Added graceful fallbacks for unexpected UI states
- Enhanced retry mechanisms for flaky operations

## Running Tests with UI Server

The default configuration starts the alanOS UI automatically as part of the test run. This is handled by the `webServer` configuration in `playwright.config.ts`:

```typescript
webServer: {
  command: 'cd ../../.. && bun start',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
  timeout: 60000, // alanOS might take some time to start
},
```

If you prefer to run the UI server separately:

1. Start the UI server in one terminal:

   ```bash
   cd alan
   bun start
   ```

2. Run tests in another terminal:
   ```bash
   cd alan/packages/client/ui-tests
   PLAYWRIGHT_TEST_BASE_URL=http://localhost:3000 npm test
   ```

## Troubleshooting

### Common Issues

1. **Tests fail to find elements**

   - Check if UI structure has changed
   - Review screenshots in the `screenshots` directory
   - Use `--headed` mode to observe the test in real-time

2. **Timeout errors**

   - Increase timeout settings in the test or config
   - Check if the UI server started correctly
   - Verify network connectivity to the UI server

3. **Inconsistent results**

   - Run with `--debug` flag for more detailed logs
   - Check for race conditions in UI interactions
   - Verify test isolation (tests affecting each other)

4. **Browser compatibility issues**

   - Try running on a different browser project
   - Check browser-specific CSS or JavaScript issues
   - Update Playwright to the latest version

5. **Browser launch failures**
   - Ensure browsers are installed with `npm run install:browsers`
   - Check for missing dependencies on Linux systems (run `npx playwright install-deps`)
   - On headless systems, install xvfb: `apt-get install xvfb` and run with `xvfb-run npx playwright test`
   - For permission issues, try running with sudo: `sudo npx playwright install`

### Debugging Strategies

1. **Interactive debugging**:

   ```bash
   npx playwright test --debug
   ```

2. **UI Mode for test inspection**:

   ```bash
   npx playwright test --ui
   ```

3. **Error screenshots**:

   - Review error screenshots in the `screenshots` directory
   - Screenshots are now only captured on test failures for better performance

4. **Trace viewing**:
   ```bash
   npx playwright show-trace test-results/trace.zip
   ```

## Extending the Test Suite

### Creating New Tests

1. Create a new numbered test file in the `tests` directory
2. Import the necessary utilities from `utils.ts`
3. Structure your test following the existing patterns
4. Add meaningful assertions and screenshots

### Best Practices

1. **Keep tests independent**: Each test should run independently
2. **Use utility functions**: Leverage the helper functions in `utils.ts`
3. **Take screenshots**: Capture UI state at key points for debugging
4. **Implement fallbacks**: Always have alternative strategies for element selection
5. **Add detailed logging**: Include console logs to help troubleshooting
6. **Test edge cases**: Cover not just happy paths but error conditions
7. **Validate state changes**: Verify that actions result in expected UI updates

## Continuous Integration

Tests can be run in CI environments with:

```bash
# CI-friendly command
npm run test:ci
```

The CI configuration:

- Runs tests on headless browsers
- Generates reports and artifacts for review
- Includes retries for flaky tests
- Captures screenshots and videos on failure

## References

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [alanOS API Documentation](https://docs.alanos.com)
- [UI Component Library](https://ui.alanos.com)
