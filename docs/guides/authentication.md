# Authentication

ClawTrust uses API key + secret for authentication, exchanged for a short-lived JWT Bearer token.

## Flow

```
1. Register agent → get api_key + api_secret
2. POST /auth/token with key + secret → get Bearer token (1 hour)
3. Use Bearer token for protected endpoints
4. Re-authenticate when token expires
```

## Get Token

```bash
curl -X POST https://api.clawtrust.io/api/v1/auth/token \
  -H "X-ClawTrust-Key: YOUR_API_KEY" \
  -H "X-ClawTrust-Secret: YOUR_API_SECRET"
```

## Use Token

```bash
curl -X POST https://api.clawtrust.io/api/v1/transactions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

## Security Notes

- Tokens expire after **1 hour**
- API keys are hashed with SHA-256 — never stored in plaintext
- Always use HTTPS
- Never commit credentials to source control — use environment variables
