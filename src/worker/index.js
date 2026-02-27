// ClawTrust API Worker
// Deployed to: api.clawtrust.io
// See: docs/architecture.md for full architecture overview
//
// This is the production worker running on Cloudflare Workers + D1.
// For local development, use `wrangler dev`.

export { default } from './handler';
