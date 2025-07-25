# @alanos/plugin-intiface

## Purpose

Intiface/Buttplug.io integration plugin for alan OS that enables control of intimate hardware devices.

## Key Features

- Support for multiple intimate hardware devices through Buttplug.io protocol
- Automatic device discovery and connection management
- Battery level monitoring for supported devices
- Vibration and rotation control (device-dependent)
- Graceful connection handling and cleanup
- Built-in device simulation for testing
- Support for customizable vibration patterns
- Automatic Intiface Engine management

## Installation

```bash
bun install @alanos/plugin-intiface
```

## Configuration

The plugin can be configured through environment variables or runtime settings:

```env
INTIFACE_URL=ws://localhost:12345
INTIFACE_NAME=alan Intiface Client
DEVICE_NAME=Lovense Nora
```

## Integration

The plugin integrates with alanOS through the execute function to control devices and retrieve information:

```typescript
import { intifacePlugin } from '@alanos/plugin-intiface';

// Vibrate device
const result = await alan.execute({
  action: 'VIBRATE',
  content: {
    strength: 0.5, // 0.0 to 1.0
    duration: 1000, // milliseconds
  },
});
```

## Links

- [Buttplug.io](https://buttplug.io)
- [Intiface Engine](https://github.com/intiface/intiface-engine)
