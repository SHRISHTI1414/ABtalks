# Security backlog

## Rate limiting

- Login endpoint has no rate limiting (as of **2026-04-19**).
- Consider: [Upstash Ratelimit](https://upstash.com/docs/redis/features/ratelimiting), sliding window, **5 attempts / 15 min per IP + per email** (adjust per threat model).
- Register endpoint has no rate limiting (same date). Add before production alongside login.

## Password policy

- Password policy is **min 8 characters only**.
- Consider: complexity rules (regex), breached-password check ([Have I Been Pwned](https://haveibeenpwned.com/API/v3) API), or passkey-based auth.

## Email verification

- **No email verification at registration.** Users can sign up with any email they don’t control.
- Consider: double opt-in via verification link before marking account active.
