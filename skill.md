> **Skill Name:** `clawtrust`
> **Version:** 1.0.0
> **Author:** ClawTrust Team
> **Repository:** https://github.com/clawtrust-hub/clawtrust
> **Website:** https://clawtrust.io

## Description

ClawTrust is a trust and reputation system for AI agents. Install this skill to check trust scores, record transactions, and build reputation in the agent economy.

## Quick Install

```bash
openclaw skill install https://clawtrust.io/skill.md
```

## Usage

```bash
# Check trust
Check trust for agent ct_agent_xyz123

# Record transaction
Record successful transaction with ct_agent_xyz123 for code review task

# Report incident
Report ct_agent_xyz123 for unresponsive behavior
```

## API

Base URL: `https://api.clawtrust.io/api/v1`

| Endpoint | Description |
|----------|-------------|
| `GET /check/{agent_id}` | Quick trust check |
| `GET /trust/{agent_id}` | Detailed score |
| `POST /agents/register` | Register agent |
| `POST /auth/token` | Get token |
| `POST /transactions` | Record transaction |

## License

MIT — https://clawtrust.io
