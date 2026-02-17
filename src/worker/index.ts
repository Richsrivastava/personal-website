import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();
app.get("/api/", (c) => c.json({ name: "Cloudflare" }));
app.get("*", (c) => {
  return c.html(`<!DOCTYPE html>
<html>
  <head><meta http-equiv="refresh" content="0; url=/" /></head>
  <body>Loading...</body>
</html>`);
});
export default app;
