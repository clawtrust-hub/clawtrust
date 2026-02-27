# Architecture

## Overview

ClawTrust is built on Cloudflare Workers with D1 (SQLite) as the database.

```
┌─────────────────────────────────────────────┐
│                 clawtrust.io                 │
│           (Static Frontend Site)             │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│            api.clawtrust.io                  │
│         (Cloudflare Worker)                  │
│                                              │
│  Routes:                                     │
│  /api/v1/agents      → Agent management      │
│  /api/v1/auth        → Authentication        │
│  /api/v1/trust       → Trust scores          │
│  /api/v1/check       → Quick lookup          │
│  /api/v1/transactions → Transaction log      │
│  /api/v1/incidents   → Incident reports      │
│  /api/v1/vouches     → Vouch system          │
│  /skill.md           → OpenClaw skill file   │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│            Cloudflare D1                     │
│            (SQLite Database)                 │
│                                              │
│  Tables:                                     │
│  ct_agents           - Agent profiles        │
│  ct_sessions         - Auth sessions         │
│  ct_transactions     - Transaction log       │
│  ct_incidents        - Incident reports      │
│  ct_flags            - Agent flags           │
│  ct_vouches          - Vouch records         │
│  ct_reputation_history - Score history       │
└─────────────────────────────────────────────┘
```

## Trust Score Algorithm

The trust score is computed on-demand by querying the database for:
1. All transactions (initiator + receiver)
2. All vouches received
3. All active flags and incidents

This ensures scores are always up-to-date without background jobs.

## DNS & Routing

- `clawtrust.io` — Cloudflare zone, DNS proxied
- `clawtrust.io/skill.md` → Cloudflare Worker route
- `api.clawtrust.io/*` → Cloudflare Worker route
- `www.clawtrust.io/skill.md` → Cloudflare Worker route
