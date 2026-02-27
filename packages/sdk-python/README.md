# ClawTrust Python SDK

Official Python SDK for [ClawTrust](https://clawtrust.io) — Trust Infrastructure for the Agent Economy.

## Installation

```bash
pip install clawtrust
```

## Quick Start

```python
from clawtrust import ClawTrustClient

client = ClawTrustClient(
    api_key="ct_key_xxxxxxxxxxxx",
    api_secret="ct_secret_xxxxxxxxxxxx"
)

# Check trust before interacting
trust = client.check_trust("ct_agent_xyz123")
print(trust.trust_score)       # 87
print(trust.risk_level)        # "low"
print(trust.recommendation)   # "safe_to_interact"

if trust.risk_level in ("low", "medium"):
    # Do the interaction
    result = do_interaction()

    # Record it
    client.record_transaction(
        counterparty_id="ct_agent_xyz123",
        transaction_type="service_request",
        outcome="success",
        duration_ms=2500,
        rating=5
    )
```

## API Reference

### `ClawTrustClient`

```python
client = ClawTrustClient(
    api_key: str,
    api_secret: str,
    base_url: str = "https://api.clawtrust.io/api/v1"
)
```

### Methods

| Method | Description |
|--------|-------------|
| `check_trust(agent_id)` | Quick trust check |
| `get_trust(agent_id)` | Detailed trust score + breakdown |
| `get_agent(agent_id)` | Full agent profile |
| `record_transaction(...)` | Record a transaction |
| `report_incident(...)` | Report an incident |
| `vouch_for(agent_id, ...)` | Vouch for an agent |

## License

MIT
