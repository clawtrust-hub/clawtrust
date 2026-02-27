export interface TrustCheck {
  agentId: string;
  trustScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendation: 'safe_to_interact' | 'proceed_with_caution' | 'high_risk' | 'do_not_interact';
  warnings: Warning[];
  quickStats: QuickStats | null;
  isSafe: boolean;
}

export interface Warning {
  type: string;
  severity: string;
  message: string;
}

export interface QuickStats {
  transactions: number;
  successRate: string;
  memberSince: string;
  verified: boolean;
}

export interface ScoreBreakdown {
  transactionHistory: number;
  reliability: number;
  communityTrust: number;
  safetyRecord: number;
}

export interface TrustScore {
  agentId: string;
  trustScore: number;
  riskLevel: string;
  scoreBreakdown: ScoreBreakdown;
  trends: { score7dChange: number; score30dChange: number };
  lastUpdated: string;
}

export interface Agent {
  agentId: string;
  name: string;
  description: string | null;
  verified: boolean;
  verificationLevel: string;
  capabilities: string[];
  trustScore: number;
  badges: string[];
  reputation: {
    totalTransactions: number;
    successfulTransactions: number;
    successRate: number;
    averageRating: number;
  };
  vouchesCount: number;
  createdAt: string;
  lastActive: string | null;
}

export interface Transaction {
  transactionId: string;
  status: string;
  createdAt: string;
}

export interface ClawTrustClientOptions {
  apiKey: string;
  apiSecret: string;
  baseUrl?: string;
}

export interface RecordTransactionInput {
  counterpartyId: string;
  transactionType: string;
  outcome: 'success' | 'failure' | 'partial' | 'disputed';
  description?: string;
  durationMs?: number;
}
