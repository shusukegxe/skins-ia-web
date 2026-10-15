// Estado del PC generador: GET -> {listo, generaciones}
export default async function handler(req, res) {
  try {
    const r = await fetch(process.env.TUNNEL_URL.trim() + '/salud');
    const dato = await r.json();
    res.status(200).json(dato);
  } catch (e) {
    res.status(200).json({ listo: false, error: 'PC apagada o tunel caido' });
  }
}
