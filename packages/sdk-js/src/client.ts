import type {
  ClawTrustClientOptions,
  TrustCheck,
  TrustScore,
  Agent,
  Transaction,
  RecordTransactionInput,
} from './types';

export class ClawTrustClient {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string;
  private token: string | null = null;

  constructor(options: ClawTrustClientOptions) {
    this.apiKey = options.apiKey;
    this.apiSecret = options.apiSecret;
    this.baseUrl = (options.baseUrl ?? 'https://api.clawtrust.io/api/v1').replace(/\/$/, '');
  }

  private async request<T>(method: string, path: string, body?: unknown, auth = false): Promise<T> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };

    if (auth) {
      if (!this.token) await this.authenticate();
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    if (!res.ok) throw new ClawTrustError(data.error ?? `HTTP ${res.status}`, res.status);
    return data as T;
  }

  private async authenticate(): Promise<void> {
    const res = await fetch(`${this.baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'X-ClawTrust-Key': this.apiKey,
        'X-ClawTrust-Secret': this.apiSecret,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new ClawTrustError(data.error ?? 'Authentication failed', res.status);
    this.token = data.access_token;
  }

  async checkTrust(agentId: string): Promise<TrustCheck> {
    const data = await this.request<Record<string, unknown>>('GET', `/check/${agentId}`);
    return {
      agentId: data.agent_id as string,
      trustScore: data.trust_score as number,
      riskLevel: data.risk_level as TrustCheck['riskLevel'],
      recommendation: data.recommendation as TrustCheck['recommendation'],
      warnings: (data.warnings as TrustCheck['warnings']) ?? [],
      quickStats: data.quick_stats as TrustCheck['quickStats'],
      isSafe: ['low', 'medium'].includes(data.risk_level as string),
    };
  }

  async getTrust(agentId: string): Promise<TrustScore> {
    return this.request<TrustScore>('GET', `/trust/${agentId}`);
  }

  async getAgent(agentId: string): Promise<Agent> {
    return this.request<Agent>('GET', `/agents/${agentId}`);
  }

  async recordTransaction(input: RecordTransactionInput): Promise<Transaction> {
    return this.request<Transaction>('POST', '/transactions', {
      counterparty_id: input.counterpartyId,
      transaction_type: input.transactionType,
      outcome: input.outcome,
      description: input.description,
      duration_ms: input.durationMs,
    }, true);
  }

  async reportIncident(data: {
    reportedAgentId: string;
    incidentType: string;
    severity: string;
    description: string;
  }): Promise<unknown> {
    return this.request('POST', '/incidents', {
      reported_agent_id: data.reportedAgentId,
      incident_type: data.incidentType,
      severity: data.severity,
      description: data.description,
    }, true);
  }

  async vouchFor(agentId: string, options?: {
    vouchType?: string;
    message?: string;
    capability?: string;
    stakeAmount?: number;
  }): Promise<unknown> {
    return this.request('POST', '/vouches', {
      vouched_agent_id: agentId,
      vouch_type: options?.vouchType ?? 'general',
      message: options?.message,
      capability: options?.capability,
      stake_amount: options?.stakeAmount ?? 0,
    }, true);
  }
}

export class ClawTrustError extends Error {
  status: number;
  constructor(message: string, status = 0) {
    super(message);
    this.name = 'ClawTrustError';
    this.status = status;
  }
}
