# Bursary SaaS (Next.js + Express + PostgreSQL)

Single deployment for Render (free tier). Frontend (Next.js) and Backend (Express) are combined in one service.

## Quick Start (Local)
```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Open http://localhost:3000

## Deploy to Render
1. Push this folder to a GitHub repo.
2. Create **New > Web Service** on Render, connect the repo.
3. Render reads `render.yaml` and provisions a free PostgreSQL DB.
4. It uses:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. After deploy, run the two one-off commands in "Shell":
   - `npm run db:migrate`
   - `npm run db:seed`

## API Endpoints (MVP)
- `POST /api/auth/register` → { name, email, password }
- `POST /api/auth/login` → returns `{ token }`
- `GET /api/bursaries` → list bursaries
- `POST /api/applications` (Bearer token) → { bursary_id, statement }
- `GET /api/applications` (Bearer token) → list my applications
- `POST /api/documents/upload` (Bearer token, multipart) → upload for AI verification (pending)

## Notes
- Document verification + chatbot hooks are ready for OpenAI integration.
- Stripe billing can be added later for SaaS monetisation.
