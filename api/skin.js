// Sirve imagenes de skins generadas por el copilot, sin problemas de CORS
// GET ?archivo=xxx.png -> PNG desde tu PC
export default async function handler(req, res) {
  const base = process.env.TUNNEL_URL;
  if (!base) { res.status(500).json({ error: 'Falta TUNNEL_URL' }); return; }
  const archivo = String(req.query.archivo ?? '');
  if (!/^[a-zA-Z0-9_.-]+$/.test(archivo)) { res.status(400).json({ error: 'nombre invalido' }); return; }
  try {
    const r = await fetch(base.trim() + '/skins/' + archivo);
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(r.status).send(buf);
  } catch (e) {
    res.status(502).json({ error: 'PC generadora no disponible' });
  }
}
