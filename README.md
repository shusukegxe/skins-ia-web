# Skins IA ✨💗

Web para generar skins de Minecraft con IA (Gepo, corriendo en una RTX 5050 local)
con copilot conversacional. Hecha con cariño.

## Cómo funciona

```
Navegador ──> Vercel (páginas estáticas + funciones /api)
                    │  TUNNEL_URL (túnel playit.gg) + SKIN_TOKEN
                    ▼
             PC generador: servidor_skin.py (FastAPI + Gepo residente)
                    ▼
             RTX 5050 genera la skin 64×64 en ~20 s
```

El copilot NO es una API de pago: los mensajes del chat quedan en el buzón del PC
generador (`cola/mensajes.json`) y una automatización local los responde
(`cola/respuestas.json`), generando la skin pedida y dejando su PNG en `salidas_web/`.

## Configuración

Variables de entorno en Vercel (Project → Settings → Environment Variables):

| Variable    | Valor                                        |
|-------------|----------------------------------------------|
| `TUNNEL_URL`| URL pública del túnel playit hacia `:8765`   |
| `SKIN_TOKEN`| el mismo token que usa el PC generador       |

En el PC generador (debe estar encendido para que la web funcione):

```
set HF_HOME=H:\IA-Modelos\hf-cache
python servidor_skin.py
```

El token se imprime en consola y se guarda en `token_actual.txt` (cópialo a Vercel).

## Túnel playit

En el agente de playit, crear un túnel HTTP/HTTPS hacia `http://localhost:8765`
y poner la URL pública resultante en `TUNNEL_URL`.

## Deploy

1. Importar este repo en Vercel (framework: Other, no necesita build).
2. Agregar las dos variables de entorno.
3. Redeploy.
