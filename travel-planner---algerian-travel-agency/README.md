# Travel Planner — Algerian Travel Agency

A production-ready React + TypeScript travel-agency website built with Vite and Tailwind CSS.

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

This is a Vite single-page application. For Vercel, use the project directory above, keep the framework detection appropriate for Vite, and deploy the generated `dist` directory.

## Important production notes

- Flight results shown by the UI are demonstration data unless a live flight provider is explicitly configured. They must not be presented as live inventory or guaranteed prices.
- Agency contact details, licensing information, social accounts, coordinates, offers and other business claims should be verified before publication.
- Booking/CMS state currently uses browser-side storage. A real centralized booking/admin backend is required for production booking management.
- Never commit API keys or other secrets to the repository. Use deployment environment variables for integrations.
