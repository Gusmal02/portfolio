# portfolio-bot — Chat de IA para el portafolio

Proxy serverless (Cloudflare Worker) que expone el asistente del portafolio usando
la API gratuita de Gemini (Flash-Lite). La API key nunca toca el frontend.

## Setup (una sola vez, ~10 min)

1. **Cuenta de AI Studio** (necesitas un Gmail):
   - Ve a https://aistudio.google.com y entra con tu Gmail.
   - Abre "Get API key" y crea una key (es gratuita, no pide tarjeta).
   - Guárdala; la usarás en el paso 3.

2. **Cuenta de Cloudflare**:
   - Ve a https://dash.cloudflare.com/sign-up y crea cuenta gratuita.

3. **Instalar wrangler y guardar la key**:
   ```sh
   cd chat-worker
   npm install
   npx wrangler login        # abre el navegador, autoriza
   npx wrangler secret put GEMINI_API_KEY   # pega la key de Gemini
   ```

4. **Desplegar**:
   ```sh
   npx wrangler deploy
   ```
   Al terminar te da una URL tipo `https://portfolio-bot.<usuario>.workers.dev`.

5. **Conectar el frontend**:
   - En `../js/chat.js` reemplaza `WORKER_URL` por la URL del paso 4.
   - Opcional: en `wrangler.toml`, en `ALLOWED_ORIGINS`, pon tu dominio
     (ej. `https://gusmal02.github.io,http://localhost:8080`) para que solo
     tu sitio pueda llamar al Worker.

## Uso local

```sh
cd chat-worker
npx wrangler dev            # arranca el worker en http://localhost:8787
```

Para probar en local con la key, antes ejecuta `npx wrangler secret put
GEMINI_API_KEY` (el `dev` también lee los secrets).

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

Límites: 20 mensajes/minuto y 300/día por IP. Todo gratis dentro de la cuota
diaria del plan Workers Free.

## Costos

- Cloudflare Workers Free: 100,000 solicitudes/día gratuitas.
- Gemini API free tier (Flash-Lite): 15 RPM / 1,000 solicitudes/día, sin tarjeta.
- Con el tráfico del portafolio: **$0**.