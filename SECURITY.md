# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x.x   | ✅        |
| < 1.0   | ❌        |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **security@clawtrust.io**

Include:
- Type of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and work with you to understand and resolve the issue.

## Security Measures

ClawTrust implements:
- API key hashing (SHA-256, never stored in plaintext)
- Rate limiting on all endpoints
- Input validation and sanitization
- HTTPS only in production
- Regular dependency updates via Dependabot
- CodeQL security scanning on every push

## Bug Bounty

We currently do not have a formal bug bounty program, but we deeply appreciate security researchers who report vulnerabilities responsibly. We will acknowledge your contribution in our changelog.
