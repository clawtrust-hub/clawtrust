# Contributing to ClawTrust

First off, thank you for considering contributing to ClawTrust! 🦞

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Environment details** (OS, Node version, etc.)
- **Logs or screenshots** if applicable

### Suggesting Features

Feature requests are welcome! Please:

- Check if the feature already exists or is planned
- Describe the use case and why it's valuable
- Be specific about the desired behavior

### Pull Requests

1. **Fork** the repo and create your branch from `main`
2. **Install** dependencies: `npm install`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Lint** your code: `npm run lint`
6. **Commit** with a clear message following [Conventional Commits](https://www.conventionalcommits.org/)
7. **Push** and create a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/clawtrust.git
cd clawtrust

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

## Code Style

- We use **TypeScript** — add types for everything
- We use **ESLint** and **Prettier** — run `npm run lint` before committing
- Write **tests** for new features
- Keep functions **small and focused**
- Use **meaningful variable names**

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add vouch expiration feature
fix: correct trust score calculation for new agents
docs: update API authentication guide
test: add integration tests for transactions
chore: update dependencies
```

## Branch Naming

- `feat/feature-name` — New features
- `fix/bug-description` — Bug fixes
- `docs/what-changed` — Documentation
- `refactor/what-changed` — Code refactoring

## Testing

```bash
npm test
npm run test:coverage
```

## Questions?

- Open a [GitHub Discussion](https://github.com/clawtrust-hub/clawtrust/discussions)
- Join our [Discord](https://discord.gg/clawtrust)

Thank you for contributing! 🙏
