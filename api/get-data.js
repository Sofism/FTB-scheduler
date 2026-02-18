const redis = require('./redis');
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const data = await redis.get('fixthatbase:teamdata');
    res.status(200).json({ data: data || {} });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load data' });
  }
};
