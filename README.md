# Skins IA ✨

Web para generar skins de Minecraft con IA (Gepo corriendo en una RTX 5050 casera)
con copilot conversacional. Alojada en GitHub Pages.

## Cómo funciona

```
Navegador ──(GitHub Pages, este repo)──> tunel playit.gg ──> PC generador
                                                            servidor_skin.py
                                                            (FastAPI + Gepo, RTX 5050)
```

- `public/index.html` — la interfaz (chat del copilot + generador rápido + visor 3D)
- `public/config.js` — `TUNNEL_URL` (URL del túnel) y `SKIN_TOKEN`
- `cola/mensajes.json` y `respuestas.json` en la carpeta del servidor = buzón del copilot

## En el PC generador

```
set HF_HOME=H:\IA-Modelos\hf-cache
python servidor_skin.py
```

El token se guarda en `token_actual.txt` (copiarlo a `public/config.js` si cambia).
El servidor acepta CORS solo desde github.io y localhost.

## Deploy

Automático: cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica
`public/` en https://shusukegxe.github.io/skins-ia-web/
(único requisito manual: Settings → Pages → Source: "GitHub Actions").
