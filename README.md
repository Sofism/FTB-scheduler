# FixThatBase — Team Availability Scheduler

Live team scheduler — players update their own availability from any device. Data persisted in Upstash Redis via Vercel serverless functions.

## Stack

- **Frontend**: Single-file HTML + CSS + JS (`index.html`)
- **Backend**: Vercel Serverless Functions (`/api/`)
- **Database**: Upstash Redis (REST API)

## Project structure

```
index.html              ← full frontend app
api/
  redis.js              ← Upstash Redis client
  get-data.js           ← GET  /api/get-data
  save-player.js        ← POST /api/save-player
  delete-player.js      ← POST /api/delete-player
package.json
vercel.json
```

## Setup

### 1. Upstash Redis

1. Go to [console.upstash.com](https://console.upstash.com) → create a Redis database
1. Copy **REST URL** and **REST Token**

### 2. Vercel

1. Push this repo to GitHub
1. Import into [vercel.com](https://vercel.com) → **Add New Project**
1. Framework preset: **Other** — Root directory: `/`
1. Add environment variables:
   
   ```
   UPSTASH_REDIS_REST_URL   = https://xxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN = your-token
   ```
1. Deploy

### 3. Local development

Create `.env.local`:

```
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

Run with Vercel CLI:

```bash
npm i -g vercel
npm install
vercel dev
```

## API

|Endpoint            |Method|Body                |Description          |
|--------------------|------|--------------------|---------------------|
|`/api/get-data`     |GET   |—                   |Returns all team data|
|`/api/save-player`  |POST  |`{name, playerData}`|Save one player      |
|`/api/delete-player`|POST  |`{name}`            |Remove a player      |

All team data is stored under the single Redis key `fixthatbase:teamdata`.

## Customizing initial data

Edit `initialTeamData` near the top of `index.html`. This is only used on first load if Redis is empty.

## Notes

- Logo (`fixthatbase-logo.jpeg`) must be in the same folder as `index.html`
- Theme preference (dark/light) stored in localStorage only
