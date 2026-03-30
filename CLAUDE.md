# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BitBeetle is a static web application — an AI-powered customer support platform for B2B SaaS companies. It unifies support channels (email, Slack, Teams) into a single inbox with AI-powered ticket resolution. There is no build step; files are served directly.

## Development

**Local development server** (no build required):
```bash
python3 -m http.server 8000
# or
npx http-server
```

There are no npm scripts, no test runner, and no linter configured.

**Deployment** is via GitHub Actions on push to `main`. The workflow injects the `OPENROUTER_API_KEY` secret into `assets/js/config.js` before uploading to GitHub Pages.

## Architecture

The app has three main pages:
- `index.html` — marketing landing page
- `login.html` — authentication (demo: `admin@bitbeetle.com` / `password`)
- `dashboard.html` — main product UI

### JavaScript modules (`assets/js/`)

| File | Role |
|------|------|
| `auth.js` | Mock auth: `bbLogin()`, `bbGuard()`, `bbLogout()`, `bbGetSession()`. Session stored in `localStorage`. |
| `config.js` | OpenRouter API key and model config (Claude Haiku 4.5). Key is injected at deploy time. |
| `openrouter.js` | Streaming calls to OpenRouter. Exports `streamOpenRouter()` and three message builders: `buildAutoResponderMessages()`, `buildCopilotMessages()`, `buildDraftMessages()`. |
| `dashboard-data.js` | Mock conversation data (`MOCK_CONVERSATIONS`), channel/status color mappings. |

### Styling

`assets/css/bitbeetle.css` (70 KB) is the design system — CSS custom properties for brand colors, dark mode palette, typography (Major Third scale, 4px base spacing), and component styles. Tailwind CSS is loaded from CDN and used for layout utilities. Alpine.js (also CDN) drives reactivity in the dashboard.

### AI data flow

1. User triggers an action (Auto-resolve, Draft reply, Copilot ask, Escalate)
2. Dashboard builds message context via the appropriate `build*Messages()` function in `openrouter.js`
3. `streamOpenRouter()` streams the SSE response from the OpenRouter API
4. Response is displayed in real-time in the UI

### CI/CD workflows (`.github/workflows/`)

- `deploy.yml` — deploys to GitHub Pages on push to `main`
- `claude.yml` — responds to `@claude` mentions in issues/PRs
- `claude-code-review.yml` — automated code review on PRs
