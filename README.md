# Seasonal Reels

A seasonal movie tracker with manual watchlist entries and optional Watchmode catalog search for movie metadata and regional streaming availability.

## Quick start

On Windows, double-click `Start Movie Tracker.bat`. It installs dependencies if needed, starts the app, and opens it in your browser.

On any platform, run `npm install` once, then `npm start`.

## Optional catalog search

The seasonal watchlist works without an API key. To enable external movie search and regional streaming availability, request a [Watchmode API key](https://api.watchmode.com/requestApiKey/), copy `.env.example` to `.env`, and set `WATCHMODE_API_KEY` there. Restart the app afterward.

The key is read by the Vite server and is not included in browser code. Never commit `.env` or share its key in chat. Catalog search and each title's provider lookup use Watchmode API credits and are subject to the account's plan and region access. The free plan is non-commercial and requires Watchmode attribution, which is included in the catalog panel.

The manual watchlist remains available without an API key. User-added movies are saved in the current browser. Watchmode search and provider lookups are proxied by Vite for local development and preview; a deployed app needs an equivalent server-side API proxy.
