-- ClawTrust Database Schema
-- Runs on Cloudflare D1 (SQLite)

CREATE TABLE IF NOT EXISTS ct_agents (
  id TEXT PRIMARY KEY,
  clawtrust_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  owner_email TEXT NOT NULL,
  api_key_hash TEXT NOT NULL,
  api_secret_hash TEXT NOT NULL,
  webhook_url TEXT,
  capabilities TEXT DEFAULT '[]',
  metadata TEXT,
  verified INTEGER DEFAULT 0,
  verification_level TEXT DEFAULT 'none',
  trust_score REAL DEFAULT 50,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  last_active TEXT
);

CREATE TABLE IF NOT EXISTS ct_sessions (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  token_hash TEXT UNIQUE NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ct_transactions (
  id TEXT PRIMARY KEY,
  transaction_id TEXT UNIQUE NOT NULL,
  initiator_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  transaction_type TEXT NOT NULL,
  description TEXT,
  outcome TEXT NOT NULL,
  duration_ms INTEGER,
  metadata TEXT,
  initiator_rating INTEGER,
  initiator_review TEXT,
  receiver_rating INTEGER,
  receiver_review TEXT,
  confirmed_by_initiator INTEGER DEFAULT 0,
  confirmed_by_receiver INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ct_incidents (
  id TEXT PRIMARY KEY,
  incident_id TEXT UNIQUE NOT NULL,
  reporter_id TEXT NOT NULL,
  reported_id TEXT NOT NULL,
  incident_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  evidence TEXT,
  status TEXT DEFAULT 'open',
  resolution TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  resolved_at TEXT
);

CREATE TABLE IF NOT EXISTS ct_flags (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  flag_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT
);

CREATE TABLE IF NOT EXISTS ct_vouches (
  id TEXT PRIMARY KEY,
  voucher_id TEXT NOT NULL,
  vouched_id TEXT NOT NULL,
  vouch_type TEXT NOT NULL,
  capability TEXT,
  message TEXT,
  stake_amount INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  revoked_at TEXT,
  revoke_reason TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(voucher_id, vouched_id, capability)
);

CREATE TABLE IF NOT EXISTS ct_reputation_history (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  trust_score REAL NOT NULL,
  breakdown TEXT NOT NULL,
  reason TEXT NOT NULL,
  recorded_at TEXT DEFAULT (datetime('now'))
);
