import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

const app = new Hono().basePath('/api') // Set base path to /api

app.post('/contact', async c => {
  const body = await c.req.json().catch(() => null)
  if (!body?.email || !body?.message) {
    return c.json({ error: 'Missing fields' }, 400)
  }

  // TODO: store to DB, or send via email API
  return c.json({ ok: true })
})

export const onRequest = handle(app)

