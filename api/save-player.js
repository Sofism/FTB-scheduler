// api/save-player.js
// POST /api/save-player → merges one player’s data into teamData in Redis
const redis = require(’./redis’);

module.exports = async function handler(req, res) {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘POST, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);

if (req.method === ‘OPTIONS’) return res.status(200).end();
if (req.method !== ‘POST’) return res.status(405).json({ error: ‘Method not allowed’ });

try {
const { name, playerData } = req.body;

```
if (!name || typeof name !== 'string') {
  return res.status(400).json({ error: 'Missing or invalid player name' });
}
if (!playerData || typeof playerData !== 'object') {
  return res.status(400).json({ error: 'Missing or invalid playerData' });
}

// Read current data, merge, write back
const current = (await redis.get('fixthatbase:teamdata')) || {};
current[name] = playerData;
await redis.set('fixthatbase:teamdata', current);

res.status(200).json({ ok: true, name });
```

} catch (err) {
console.error(‘SAVE error:’, err);
res.status(500).json({ error: ‘Failed to save data’ });
}
};