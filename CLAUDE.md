# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Vite dev server on port 3000

# Build
npm run build        # Production build
npm run preview      # Preview production build

# Linting (run all checks)
npm run lint         # ESLint + Stylelint + TypeScript type check

# Individual checks
npm run lint:js      # ESLint for TypeScript/TSX
npm run lint:css     # Stylelint for CSS
npm run lint:types   # TypeScript type check (tsc --noEmit)
npm run check:css-vars    # Validate CSS variables
npm run check:css-classes # Validate CSS class names
```

## Architecture

**BitBeetle** is an AI chatbot SaaS platform. The app has three main surfaces:

1. **Landing page** (`/`) — public marketing page
2. **Dashboard** (`/dashboard/*`) — protected area for managing chatbots and knowledge bases
3. **Widget** (`/widget`) — embeddable chat interface that end-users interact with

### Route Structure

```
/                          → LandingPage (public marketing)
/widget                    → WidgetPage (embedded chatbot — served in iframes)
/dashboard                 → ChatbotsPage (list/create bots)
/dashboard/chatbots/:id    → ChatbotDetailsPage (config, knowledge base, embed code)
/dashboard/chatbots/:id/test → Widget in test mode
/dashboard/analytics       → AnalyticsPage
/dashboard/settings        → SettingsPage (placeholder)
/dashboard/billing         → Billing (placeholder)
```

`DashboardLayout` wraps all `/dashboard/*` routes and handles auth. It listens via `blink.auth.onAuthStateChanged()` and redirects unauthenticated users to `/`.

### Backend: Blinkdotnew SDK

All backend functionality (auth, database, AI, RAG, storage) goes through a single SDK client at `src/lib/blink.ts`. There is no separate API server.

- `blink.auth` — authentication state + user info
- `blink.db.chatbots / conversations / messages / knowledgeBase` — database CRUD
- `blink.rag.*` — RAG operations: `aiSearch()`, `createCollection()`, `upload()`, `deleteDocument()`
- `blink.storage.upload()` — file uploads
- `blink.ai.generateText()` — LLM text generation

### Key Pages

**ChatbotDetailsPage** is the most complex page — it has four tabs (Overview, Knowledge Base, Settings, Installation) and handles document upload into RAG collections, bot configuration, and embed code generation.

**WidgetPage** is the runtime chat interface. It uses RAG for knowledge retrieval, falls back to generic LLM if no RAG data, and supports theming via URL params (widget ID, primary color).

### UI Stack

- **Shadcn/ui** (new-york style) — 40+ Radix UI components in `src/components/ui/`
- **Tailwind CSS** with CSS variables for theming — colors/shadows defined in `src/index.css`
- **Path alias**: `@/` maps to `src/`
- **`cn()`** utility from `src/lib/utils.ts` for merging Tailwind classes (clsx + tailwind-merge)
- Forms use **React Hook Form** + **Zod** for validation
- Charts use **Recharts**
- Notifications via **Sonner** (toasts)

### Fonts

- `font-sans` → Geist
- `font-serif` / display text → Playfair Display (italic variant used for branding)
- `font-mono` → Geist Mono
