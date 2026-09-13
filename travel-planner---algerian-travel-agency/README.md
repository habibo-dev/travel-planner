# Travel Planner — Algerian Travel Agency

A React + TypeScript travel-agency website built with Vite and Tailwind CSS.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Lucide React
- Motion

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run lint
npm run build
npm run preview
```

The application lives in `travel-planner---algerian-travel-agency/`. When deploying from the repository root, configure the deployment platform's **Root Directory** to that folder.

## Deployment

This is a Vite single-page application. For Vercel, use the project directory above and deploy the generated `dist` directory.

## Production safety

- Flight search is a **request flow**, not a live flight inventory. The site must not display invented flight availability, schedules or prices.
- Customer testimonials and traveler counts must be based on verified, authorized material before publication.
- Agency contact details, licensing information, social accounts, coordinates, offers and other business claims must be verified before publication.
- Booking/CMS state currently uses browser-side storage. A centralized backend/database is required for real multi-user production booking management.
- Never commit API keys or other secrets to the repository. Use deployment environment variables for integrations.
