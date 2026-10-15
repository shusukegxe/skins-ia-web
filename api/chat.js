// Buzon del copilot: la web deja mensajes para ZCode y recoge sus respuestas
// POST {texto} -> deja mensaje, devuelve {id}
// GET ?id=xxx  -> {lista, respuesta, skin}
export default async function handler(req, res) {
  const base = process.env.TUNNEL_URL;
  if (!base) { res.status(500).json({ error: 'Falta TUNNEL_URL' }); return; }

  try {
    if (req.method === 'POST') {
      const texto = String(req.body?.texto ?? '').trim();
      if (!texto) { res.status(400).json({ error: 'texto vacio' }); return; }
      const r = await fetch(base.trim() + '/mensaje', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: texto.slice(0, 2000) }),
      });
      const dato = await r.json();
      res.status(r.status).json(dato);
      return;
    }
    if (req.method === 'GET') {
      const id = String(req.query.id ?? '');
      if (!/^[a-f0-9]{12}$/.test(id)) { res.status(400).json({ error: 'id invalido' }); return; }
      const r = await fetch(base.trim() + '/respuesta/' + id);
      const dato = await r.json();
      res.status(r.status).json(dato);
      return;
    }
    res.status(405).json({ error: 'metodo no permitido' });
  } catch (e) {
    res.status(502).json({ error: 'PC generadora no disponible' });
  }
}
