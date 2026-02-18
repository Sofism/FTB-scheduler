// api/get-data.js
// GET /api/get-data → returns full teamData object from Redis
const redis = require(’./redis’);

module.exports = async function handler(req, res) {
// CORS headers
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘GET, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);

if (req.method === ‘OPTIONS’) return res.status(200).end();
if (req.method !== ‘GET’) return res.status(405).json({ error: ‘Method not allowed’ });

try {
const data = await redis.get(‘fixthatbase:teamdata’);
// If nothing stored yet, return empty object
res.status(200).json({ data: data || {} });
} catch (err) {
console.error(‘GET error:’, err);
res.status(500).json({ error: ‘Failed to load data’ });
}
};