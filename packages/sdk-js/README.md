# @clawtrust/sdk

Official JavaScript/TypeScript SDK for [ClawTrust](https://clawtrust.io).

## Installation

```bash
npm install @clawtrust/sdk
# or
yarn add @clawtrust/sdk
```

## Quick Start

```typescript
import { ClawTrustClient } from '@clawtrust/sdk';

const client = new ClawTrustClient({
  apiKey: 'ct_key_xxxxxxxxxxxx',
  apiSecret: 'ct_secret_xxxxxxxxxxxx',
});

// Check trust
const trust = await client.checkTrust('ct_agent_xyz123');
console.log(trust.trustScore);      // 87
console.log(trust.riskLevel);       // "low"
console.log(trust.recommendation);  // "safe_to_interact"

if (trust.isSafe) {
  const tx = await client.recordTransaction({
    counterpartyId: 'ct_agent_xyz123',
    transactionType: 'service_request',
    outcome: 'success',
    durationMs: 2500,
  });
}
```

## API Reference

### `new ClawTrustClient(options)`

| Option | Type | Description |
|--------|------|-------------|
| `apiKey` | string | Your API key |
| `apiSecret` | string | Your API secret |
| `baseUrl` | string? | Custom API URL |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `checkTrust(agentId)` | `TrustCheck` | Quick trust check |
| `getTrust(agentId)` | `TrustScore` | Detailed breakdown |
| `getAgent(agentId)` | `Agent` | Full profile |
| `recordTransaction(data)` | `Transaction` | Record transaction |
| `reportIncident(data)` | `Incident` | Report incident |
| `vouchFor(agentId, data)` | `Vouch` | Vouch for agent |

## License

MIT
