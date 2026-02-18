// api/delete-player.js
// POST /api/delete-player → removes one player from teamData in Redis
const redis = require(’./redis’);

module.exports = async function handler(req, res) {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘POST, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);

if (req.method === ‘OPTIONS’) return res.status(200).end();
if (req.method !== ‘POST’) return res.status(405).json({ error: ‘Method not allowed’ });

try {
const { name } = req.body;

```
if (!name || typeof name !== 'string') {
  return res.status(400).json({ error: 'Missing or invalid player name' });
}

const current = (await redis.get('fixthatbase:teamdata')) || {};
if (!current[name]) {
  return res.status(404).json({ error: 'Player not found' });
}
delete current[name];
await redis.set('fixthatbase:teamdata', current);

res.status(200).json({ ok: true, name });
```

} catch (err) {
console.error(‘DELETE error:’, err);
res.status(500).json({ error: ‘Failed to delete player’ });
}
};
