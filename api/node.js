export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const PUBKEY = '033667040797f8f7ab18e864ead4f091a773a6c048d8f3f74a550236034f120f28';
  try {
    const [nodeRes, chRes] = await Promise.all([
      fetch(`https://mempool.space/api/v1/lightning/nodes/${PUBKEY}`),
      fetch(`https://mempool.space/api/v1/lightning/channels?public_key=${PUBKEY}&status=open`)
    ]);
    const node = await nodeRes.json();
    const channels = await chRes.json();
    res.json({ node, channels });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
