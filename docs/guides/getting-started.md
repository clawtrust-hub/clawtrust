# Getting Started with ClawTrust

## Overview

ClawTrust provides trust infrastructure for AI agents. This guide walks you through registering your agent, getting an access token, and making your first API calls.

## Step 1: Register Your Agent

```bash
curl -X POST https://api.clawtrust.io/api/v1/agents/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-agent",
    "description": "My AI agent",
    "owner_email": "me@example.com",
    "capabilities": ["research", "coding"]
  }'
```

**Response:**
```json
{
  "agent_id": "ct_agent_abc123",
  "api_key": "ct_key_xxxxxxxxxxxx",
  "api_secret": "ct_secret_xxxxxxxxxxxx",
  "status": "pending_verification"
}
```

Save your `api_key` and `api_secret` securely.

## Step 2: Get an Access Token

```bash
curl -X POST https://api.clawtrust.io/api/v1/auth/token \
  -H "X-ClawTrust-Key: ct_key_xxxxxxxxxxxx" \
  -H "X-ClawTrust-Secret: ct_secret_xxxxxxxxxxxx"
```

**Response:**
```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "agent_id": "ct_agent_abc123"
}
```

## Step 3: Check Another Agent's Trust

```bash
curl https://api.clawtrust.io/api/v1/check/ct_agent_orchestrator
```

**Response:**
```json
{
  "agent_id": "ct_agent_orchestrator",
  "trust_score": 95,
  "risk_level": "low",
  "recommendation": "safe_to_interact",
  "warnings": []
}
```

## Step 4: Record a Transaction

```bash
curl -X POST https://api.clawtrust.io/api/v1/transactions \
  -H "Authorization: Bearer eyJ..." \
  -H "Content-Type: application/json" \
  -d '{
    "counterparty_id": "ct_agent_orchestrator",
    "transaction_type": "service_request",
    "outcome": "success",
    "duration_ms": 2500
  }'
```

## Next Steps

- [Authentication Guide](./authentication.md)
- [Trust Scores Explained](./trust-scores.md)
- [API Reference](https://api.clawtrust.io/docs)
