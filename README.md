# lorealroutinebuilder.com
# L'Oreal Routine Builder

Select skincare products and generate a personalized routine through OpenAI.

## Run locally

Set an API key in the server environment without writing it into the project,
then start the app:

```bash
read -rs -p "OpenAI API key: " OPENAI_API_KEY; echo
export OPENAI_API_KEY
npm start
```

Open `http://127.0.0.1:4173`.

`OPENAI_MODEL` is optional and defaults to `gpt-6-luna`, which supports the
Responses API and web search. Set `OPENAI_MODEL` to another model available to
your OpenAI project that supports both features; review its pricing before
changing the default.

To run the routine response regression tests with Node.js 24:

```bash
node --test test/openai-connection.test.cjs test/frontend-response.test.cjs
```

## Deploy to Cloudflare

The API key must be configured on the same Cloudflare runtime that serves the
chat endpoint. Do not put the key in browser code.

### Pages frontend with a separate Worker

1. Create a Cloudflare Pages project from this repository. Use `public` as the
   build output directory. Once deployed, note its production origin, for
   example `https://your-project.pages.dev` (not a GitHub repository path).
2. In `wrangler.toml`, add the exact Pages origin, without a trailing slash or
   path. Use the actual origin rather than the example:

   ```toml
   [vars]
   ALLOWED_ORIGIN = "https://your-project.pages.dev"
   ```

   This is a public setting, not a secret. The Worker also permits requests
   from its own origin. Preview deployments have different origins and need a
   matching setting in a separate Worker environment; do not use `*`.
3. Log in and set the Worker secret interactively, then deploy:

   ```bash
   npx wrangler login
   npx wrangler secret put OPENAI_API_KEY
   npm run deploy
   ```

   `wrangler.toml` identifies the Worker as `lorealroutinebuilder-com` and
   `src/index.ts` as its entry point; there is no `worker.js` in this project.
   The secret belongs to that Worker, not the Pages project. For a named
   Wrangler environment, set its secret and origin and deploy to that same
   environment. `OPENAI_MODEL` can be set as a non-secret Worker variable.
4. Copy the Worker URL shown by Wrangler or the Cloudflare dashboard. In
   `public/index.html`, change the `routine-api-url` meta tag's content to the
   full Worker URL followed by `/api/routine`, for example
   `https://your-worker.your-subdomain.workers.dev/api/routine`. This URL is
   public; never put the API key there. Commit and deploy the Pages changes.
5. In the deployed site, select a product or send a chat message. In browser
   developer tools, check that the request goes to the Worker URL, uses POST
   and JSON, and returns a JSON `routine`. An OPTIONS preflight should return
   204 with the matching `Access-Control-Allow-Origin`.

The Worker supports `GET /` as a health check, returning `{"status":"ok"}`.
It only confirms that the Worker is running; it does not check the secret or
OpenAI connectivity. Send routine requests to `POST /api/routine`; the same
path accepts `OPTIONS` for CORS preflight. Other methods or paths return HTTP 405.
For example, after deploying:

```bash
curl -i https://your-worker.your-subdomain.workers.dev/
```

The Worker calls `POST https://api.openai.com/v1/responses`, authenticating with
`env.OPENAI_API_KEY`. A missing key returns HTTP 500. An OpenAI failure returns
HTTP 502 with the upstream status: 401 indicates a key problem, 404 can indicate
an endpoint or model problem, and 429 indicates a rate limit or billing issue.
An upstream 500 or a network failure can be transient. Opening `/api/routine`
in a browser uses GET and returns HTTP 405; this does not test the API key. A browser CORS
error generally means the Pages origin does not exactly match `ALLOWED_ORIGIN`,
or that the browser is not reaching the intended Worker URL. Inspect Worker
logs for status-only diagnostics; response bodies and credentials are not logged.

The API is public: CORS is not authentication and does not prevent non-browser
clients from calling it. Apply appropriate authentication and rate limiting
before relying on it to protect OpenAI usage and costs.

### Same-origin alternatives

With the default `/api/routine` meta value, the browser calls the same origin
that serves the page. You can serve `public` directly from the deployed Worker,
or use the Pages Function in `functions/api/routine.js` with a Pages deployment.
For the Pages Function, set the secret on the Pages project instead of (or in
addition to) the Worker:

```bash
npx wrangler pages secret put OPENAI_API_KEY --project-name <your-pages-project>
```

Deploy the site through the Pages project; `npm run deploy` is for the Worker,
not Pages. The root `wrangler.toml` is Worker configuration, not Pages
configuration; do not use it as the Pages project's configuration file. Pages
Functions require a Git integration or Wrangler deployment, not dashboard
Direct Upload. If using the Worker to serve assets, `.assetsignore` is an
allowlist: add any new public assets there.

The browser keeps the recent chat transcript and sends it with each follow-up request so the routine responses remain contextual.

Selected products are saved in browser local storage, so they remain selected after a reload. Use a product's × button or "Clear all" to remove them.

Routine responses use OpenAI's live web-search tool and display a Sources section with clickable links when sources are returned.

Products can be filtered instantly by name or description keyword and by category.

The layout supports left-to-right and right-to-left modes. Use the language-direction control in the header to switch; the preference is saved locally.