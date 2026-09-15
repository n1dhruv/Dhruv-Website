# Dhruv Sharma — Portfolio

Personal developer portfolio showcasing projects, experience, open-source work, technical setup, and a real-time Last.fm music status integration.

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

### Last.fm integration

The portfolio includes a compact, frontend-only music widget that displays the currently playing or most recently played track. The widget calls the Last.fm `user.getRecentTracks` public API directly from the browser without any backend, serverless functions, proxy servers, or database.

#### Environment Variables

Create a `.env.local` file inside the `frontend/` directory (or configure them in your deployment platform's environment settings):

```bash
NEXT_PUBLIC_LASTFM_USERNAME=your_lastfm_username
NEXT_PUBLIC_LASTFM_API_KEY=your_lastfm_api_key
```

The Last.fm API key used by this widget is intentionally client-visible because this portfolio uses a frontend-only Last.fm integration.

Only a standard public read API key is needed. Never expose or use your Last.fm Shared Secret or account credentials.
