# portfolio-bot — Chat de IA para el portafolio

Proxy serverless (Cloudflare Worker) que expone el asistente del portafolio usando
**Cloudflare Workers AI** (modelo Llama 4 Scout). Sin llaves externas ni costos.

## Estado actual

- Desplegado en: `https://portfolio-bot.gustavo-a-maldonado-v.workers.dev`
- El frontend (`../js/chat.js`) ya apunta a esa URL.

## ¿Por qué Workers AI y no Gemini?

Google migró sus claves API al nuevo formato `AQ.` (Authentication Keys), que por
2026 no funcionan con llamadas REST directas (`x-goog-api-key` / `Bearer`). Es un
bug conocido en el foro oficial de Google. Workers AI es gratis, no pide llaves y
usa la misma cuenta de Cloudflare.

## Comandos

```sh
npm install          # instala wrangler
npx wrangler login   # autenticación (una vez)
npx wrangler deploy  # desplegar
npx wrangler dev     # probar en local (http://localhost:8787)
```

## Configuración

`wrangler.toml`:
- `[ai] binding = "AI"` — binding de Workers AI.
- `AI_MODEL` — modelo (`@cf/meta/llama-4-scout-17b-16e-instruct` por defecto).
- `ALLOWED_ORIGINS` — lista de dominios permitidos (vacío = permitir todos).
  Ejemplo: `https://gusmal02.github.io,http://localhost:8080`.

## Rate limiting (opcional)

Por defecto no hay límite. Para activarlo crea un namespace de KV:

```sh
npx wrangler kv namespace create RATE
```

Copia el `id` y añade a `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "RATE"
id = "EL_ID_QUE_TE_DIO"
```

Límites: 20 mensajes/minuto y 300/día por IP.

## Costos

- Cloudflare Workers Free: 100,000 solicitudes/día.
- Workers AI Free: 10,000 neuronas/día (≈1,300 respuestas de chat).
- Con el tráfico del portafolio: **$0**.