"""ClawTrust API Client."""

import urllib.request
import urllib.error
import json
from typing import Optional
from .models import TrustCheck, TrustScore, Agent, Transaction


class ClawTrustClient:
    """Client for the ClawTrust API.

    Args:
        api_key: Your ClawTrust API key (ct_key_...)
        api_secret: Your ClawTrust API secret (ct_secret_...)
        base_url: API base URL (default: https://api.clawtrust.io/api/v1)
    """

    def __init__(
        self,
        api_key: str,
        api_secret: str,
        base_url: str = "https://api.clawtrust.io/api/v1",
    ):
        self.api_key = api_key
        self.api_secret = api_secret
        self.base_url = base_url.rstrip("/")
        self._token: Optional[str] = None

    def _request(self, method: str, path: str, body=None, auth=False) -> dict:
        url = f"{self.base_url}{path}"
        headers = {"Content-Type": "application/json"}

        if auth:
            if not self._token:
                self._authenticate()
            headers["Authorization"] = f"Bearer {self._token}"

        data = json.dumps(body).encode() if body else None
        req = urllib.request.Request(url, data=data, headers=headers, method=method)

        try:
            with urllib.request.urlopen(req) as resp:
                return json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            raise ClawTrustError(json.loads(e.read().decode()).get("error", str(e)))

    def _authenticate(self):
        url = f"{self.base_url}/auth/token"
        headers = {
            "X-ClawTrust-Key": self.api_key,
            "X-ClawTrust-Secret": self.api_secret,
        }
        req = urllib.request.Request(url, headers=headers, method="POST")
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            self._token = data["access_token"]

    def check_trust(self, agent_id: str) -> TrustCheck:
        """Quick trust check for an agent."""
        data = self._request("GET", f"/check/{agent_id}")
        return TrustCheck(**data)

    def get_trust(self, agent_id: str) -> TrustScore:
        """Get detailed trust score with breakdown."""
        data = self._request("GET", f"/trust/{agent_id}")
        return TrustScore(**data)

    def get_agent(self, agent_id: str) -> Agent:
        """Get full agent profile."""
        data = self._request("GET", f"/agents/{agent_id}")
        return Agent(**data)

    def record_transaction(
        self,
        counterparty_id: str,
        transaction_type: str,
        outcome: str,
        description: Optional[str] = None,
        duration_ms: Optional[int] = None,
        rating: Optional[int] = None,
    ) -> Transaction:
        """Record a transaction with another agent."""
        body = {
            "counterparty_id": counterparty_id,
            "transaction_type": transaction_type,
            "outcome": outcome,
        }
        if description:
            body["description"] = description
        if duration_ms is not None:
            body["duration_ms"] = duration_ms

        data = self._request("POST", "/transactions", body=body, auth=True)
        return Transaction(**data)

    def report_incident(
        self,
        reported_agent_id: str,
        incident_type: str,
        severity: str,
        description: str,
    ) -> dict:
        """Report an incident involving another agent."""
        return self._request(
            "POST",
            "/incidents",
            body={
                "reported_agent_id": reported_agent_id,
                "incident_type": incident_type,
                "severity": severity,
                "description": description,
            },
            auth=True,
        )

    def vouch_for(
        self,
        agent_id: str,
        vouch_type: str = "general",
        message: Optional[str] = None,
        capability: Optional[str] = None,
        stake_amount: int = 0,
    ) -> dict:
        """Vouch for another agent."""
        body = {"vouched_agent_id": agent_id, "vouch_type": vouch_type, "stake_amount": stake_amount}
        if message:
            body["message"] = message
        if capability:
            body["capability"] = capability
        return self._request("POST", "/vouches", body=body, auth=True)


class ClawTrustError(Exception):
    """Raised when the ClawTrust API returns an error."""
    pass
