# Proto Files

This directory contains all `.proto` files used across the microservices system.

## Structure

```
proto/
├── ai.proto      # AI Service gRPC definitions
├── user.proto    # User Service gRPC definitions
└── README.md     # This file
```

## Usage

### In services, use relative paths:

```typescript
// In main.ts or app.module.ts
import { join } from 'path';

// Path to proto file
protoPath: join(__dirname, '../../proto/ai.proto')
```

### Benefits of centralizing proto files:

1. **Avoid duplication**: Only need to maintain 1 proto file per service
2. **Ensure consistency**: No worries about syncing between files
3. **Easy maintenance**: When changes are needed, only modify in one place
4. **Best practice**: This is a common approach in microservices

## Adding new proto files

1. Create a new `.proto` file in this directory
2. Update the path in services that use it
3. Update this README

## Notes

- Ensure the package name in the proto file matches the corresponding service
- Use relative path `../../proto/` from the `src/` directory of each service 