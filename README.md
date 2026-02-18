# FixThatBase — Team Availability Scheduler

Single-file web app for coordinating team availability across timezones. No backend, no dependencies — everything runs in the browser with localStorage persistence.

## Files

```
index.html     ← the entire app (HTML + CSS + JS)
vercel.json    ← Vercel routing config
.gitignore
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `fixthatbase`)
1. Push these files:
   
   ```bash
   git init
   git add .
   git commit -m "initial"
   git branch -M main
   git remote add origin https://github.com/YOUR_USER/fixthatbase.git
   git push -u origin main
   ```
1. Go to **Settings → Pages → Source** → select `main` branch, root `/`
1. Live at `https://YOUR_USER.github.io/fixthatbase`

## Deploy to Vercel (recommended)

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option B — Vercel dashboard

1. [vercel.com](https://vercel.com) → **Add New Project**
1. Import your GitHub repo
1. Framework preset: **Other** — Root directory: `/`
1. Deploy

## Customizing team data

Edit `initialTeamData` near the top of `index.html`:

```js
PLAYERNAME: {
    timezone: 'UTC+1',
    availability: {
        Monday:    [18,19,20],  // UTC hours (0–23)
        Tuesday:   [18,19,20],
        Wednesday: [],
        Thursday:  [18,19,20],
        Friday:    [18,19,20],
        Saturday:  [],
        Sunday:    []
    },
    notes: 'Optional note',
    exceptions: []
}
```

All hours in **UTC**. The UI converts to any selected timezone on display.

## Exception types

|Type                        |Time selectors    |
|----------------------------|------------------|
|❌ Whole day unavailable     |Not needed        |
|🚫 Blocked hours             |From / To required|
|✅ Whole day available       |Not needed        |
|🕐 Only available these hours|From / To required|

## Notes

- Data persists in `localStorage` — no server needed
- Logo (`fixthatbase-logo.jpeg`) must be in the same folder as `index.html`
- Mobile and desktop ready
