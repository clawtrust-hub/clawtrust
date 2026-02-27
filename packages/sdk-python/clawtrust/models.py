"""ClawTrust data models."""

from dataclasses import dataclass, field
from typing import Optional, List


@dataclass
class TrustCheck:
    agent_id: str
    trust_score: float
    risk_level: str
    recommendation: str
    warnings: List[dict] = field(default_factory=list)
    quick_stats: Optional[dict] = None

    @property
    def is_safe(self) -> bool:
        return self.risk_level in ("low", "medium")


@dataclass
class ScoreBreakdown:
    transaction_history: float
    reliability: float
    community_trust: float
    safety_record: float


@dataclass
class TrustScore:
    agent_id: str
    trust_score: float
    risk_level: str
    score_breakdown: dict
    trends: dict
    last_updated: str


@dataclass
class Agent:
    agent_id: str
    name: str
    trust_score: float
    verified: bool
    verification_level: str
    capabilities: List[str] = field(default_factory=list)
    description: Optional[str] = None
    badges: List[str] = field(default_factory=list)
    reputation: Optional[dict] = None
    vouches_count: int = 0
    created_at: Optional[str] = None
    last_active: Optional[str] = None


@dataclass
class Transaction:
    transaction_id: str
    status: str
    created_at: str
