const redis = require('./redis');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  try {
    const { name, playerData } = req.body;
    
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Missing name' });
    }
    
    if (!playerData || typeof playerData !== 'object') {
      return res.status(400).json({ error: 'Missing playerData' });
    }
    
    const current = (await redis.get('fixthatbase:teamdata')) || {};
    const isNew = !current[name];
    current[name] = playerData;
    await redis.set('fixthatbase:teamdata', current);
    
    // Discord notification
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const tz = playerData.timezone || 'UTC';
        const totalHours = Object.values(playerData.availability || {})
          .reduce((s, h) => s + h.length, 0);
        const excCount = (playerData.exceptions || []).length;
        const excNote = excCount > 0 ? ` · ${excCount} exception${excCount !== 1 ? 's' : ''}` : '';
        const action = isNew ? 'joined the roster' : 'updated their schedule';
        
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [{
              color: isNew ? 0x3fb950 : 0xff006e,
              title: `${isNew ? '➕' : '✏️'} ${name} ${action}`,
              fields: [
                { name: 'Timezone', value: tz, inline: true },
                { name: 'Hours/week', value: `${totalHours}h${excNote}`, inline: true },
              ],
              footer: { text: 'FTB Scheduler' },
              timestamp: new Date().toISOString()
            }]
          })
        });
      } catch (discordErr) {
        console.warn('Discord notify failed:', discordErr.message);
      }
    }
    
    res.status(200).json({ ok: true, name });
  } catch (err) {
    console.error('SAVE error:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
};
