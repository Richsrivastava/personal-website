import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

const app = new Hono()

app.get('/github', async c => {
  const res = await fetch('https://github.com/Richsrivastava?tab=repositories')
  const data = await res.json()
  return c.json(data)
})

// export const onRequest = handle(app, '/api')
export const onRequest = handle(app)
