// Proxy de generacion: el navegador -> Vercel -> tu PC (tunel playit) -> Gepo
export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'metodo no permitido' }); return; }
  const base = process.env.TUNNEL_URL;
  if (!base) { res.status(500).json({ error: 'Falta TUNNEL_URL en variables de entorno' }); return; }
  try {
    const r = await fetch(base.trim() + '/generar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': process.env.SKIN_TOKEN ?? '',
      },
      body: JSON.stringify({
        prompt: String(req.body?.prompt ?? '').slice(0, 1500),
        modelo: req.body?.modelo === 'alex' ? 'alex' : 'steve',
        seed: Number.isInteger(req.body?.seed) ? req.body.seed : null,
      }),
    });
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('X-Seed', r.headers.get('x-seed') ?? '');
    res.setHeader('Cache-Control', 'no-store');
    res.status(r.status).send(buf);
  } catch (e) {
    res.status(502).json({ error: 'No llego al PC generador (¿esta encendido? ¿esta el tunel?)' });
  }
}
