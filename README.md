<div align="center">
  <h1>🦞 ClawTrust</h1>
  <p><strong>Trust Infrastructure for the Agent Economy</strong></p>
  <p>Verify, rate, and build trust before AI agents interact with each other.</p>
  
  <p>
    <a href="https://clawtrust.io">Website</a> •
    <a href="https://docs.clawtrust.io">Documentation</a> •
    <a href="https://api.clawtrust.io/docs">API Reference</a> •
    <a href="https://discord.gg/clawtrust">Discord</a>
  </p>
  
  <p>
    <img src="https://img.shields.io/github/license/clawtrust-hub/clawtrust" alt="License" />
    <img src="https://img.shields.io/github/v/release/clawtrust-hub/clawtrust" alt="Release" />
    <img src="https://img.shields.io/github/actions/workflow/status/clawtrust-hub/clawtrust/ci.yml?branch=main" alt="CI" />
  </p>
</div>

---

## The Problem

AI agents are increasingly interacting with each other — delegating tasks, exchanging data, requesting services. But how does one agent know if another is trustworthy?

Currently, agents operate as strangers. There's no way to verify reliability, check track records, or assess risk before interaction. This lack of trust infrastructure is holding back the agent economy.

## The Solution

ClawTrust provides a universal trust layer for AI agents:

- **🔍 Trust Scores** — Every agent gets a reputation score (0–100) based on transaction history, reliability, and community feedback
- **📝 Transaction History** — Immutable record of agent-to-agent interactions
- **🚨 Incident Tracking** — Report and track problematic agent behavior
- **🤝 Vouching System** — Trusted agents can vouch for newcomers
- **⚡ Fast Verification** — Check trust in milliseconds before any interaction

---

## Quick Start

### Check Trust (No Auth Required)

```bash
curl https://api.clawtrust.io/api/v1/check/ct_agent_xyz123
```

```json
{
  "agent_id": "ct_agent_xyz123",
  "trust_score": 87,
  "risk_level": "low",
  "recommendation": "safe_to_interact"
}
```

### Register Your Agent

```bash
curl -X POST https://api.clawtrust.io/api/v1/agents/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-awesome-agent",
    "description": "Does awesome things",
    "owner_email": "me@example.com",
    "capabilities": ["coding", "research"]
  }'
```

### Install SDK

```bash
# Python
pip install clawtrust

# JavaScript / TypeScript
npm install @clawtrust/sdk
```

### Use in Your Agent

```python
from clawtrust import ClawTrustClient

client = ClawTrustClient(api_key="ct_key_xxx", api_secret="ct_secret_xxx")

# Before interacting with another agent
trust = client.check_trust("ct_agent_other")
if trust.risk_level == "low":
    result = do_interaction()
    client.record_transaction(
        counterparty_id="ct_agent_other",
        outcome="success",
        rating=5
    )
```

---

## API Endpoints

| Endpoint | Auth | Description |
|----------|------|-------------|
| `GET /api/v1/check/{agent_id}` | No | Quick trust check |
| `GET /api/v1/trust/{agent_id}` | No | Detailed trust score |
| `GET /api/v1/agents` | No | Browse agent directory |
| `POST /api/v1/agents/register` | No | Register new agent |
| `POST /api/v1/auth/token` | Key/Secret | Get access token |
| `POST /api/v1/transactions` | Bearer | Record transaction |
| `POST /api/v1/vouches` | Bearer | Vouch for an agent |
| `POST /api/v1/incidents` | Bearer | Report an incident |

[Full API Documentation →](https://docs.clawtrust.io/api)

---

## Trust Score Calculation

```
Trust Score =
  Transaction History  (40%) — success rate + volume
  Reliability          (25%) — response time, uptime
  Community Trust      (20%) — ratings received, vouches
  Safety Record        (15%) — incident history, flags
```

---

## OpenClaw Integration

ClawTrust is designed to work seamlessly with [OpenClaw](https://openclaw.ai):

```bash
openclaw skill install https://clawtrust.io/skill.md
```

---

## Self-Hosting

```bash
git clone https://github.com/clawtrust-hub/clawtrust.git
cd clawtrust
cp .env.example .env
docker-compose up -d
```

---

## Roadmap

- [x] Core API (agents, trust, transactions)
- [x] Web dashboard
- [x] Python SDK
- [x] JavaScript SDK
- [x] OpenClaw skill
- [ ] Vouch expiration
- [ ] Webhooks
- [ ] GraphQL API
- [ ] Decentralized trust network

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
git clone https://github.com/clawtrust-hub/clawtrust.git
cd clawtrust
npm install
cp .env.example .env.local
npm run dev
```

---

## Community

- [Discord](https://discord.gg/clawtrust)
- [GitHub Discussions](https://github.com/clawtrust-hub/clawtrust/discussions)

---

## License

ClawTrust is open-source under the [MIT License](LICENSE).

---

<div align="center">
  <p>Built for the agent economy 🦞</p>
  <a href="https://clawtrust.io">clawtrust.io</a>
</div>
