# lorealroutinebuilder.com
# L'Oreal Routine Builder

Select skincare products and generate a personalized routine through OpenAI.

## Run locally

Set an API key in the server environment, then start the app:

```bash
export OPENAI_API_KEY="your-api-key"
npm start
```

Open `http://127.0.0.1:4173`.

`OPENAI_MODEL` is optional and defaults to `gpt-4o-mini`.

To run the routine response regression tests with Node.js 24:

```bash
node --test test/openai-connection.test.cjs test/frontend-response.test.cjs
```

## Deploy to Cloudflare

The API key must be configured on the same Cloudflare runtime that serves the
chat endpoint. Do not put the key in browser code.

### Cloudflare Worker

`npm run deploy` deploys `src/index.ts` as a Worker. Set the Worker secret
before deploying. Log in to Cloudflare first if needed:

```bash
npx wrangler login
npx wrangler secret put OPENAI_API_KEY
npm run deploy
```

The Worker serves only the files listed in `.assetsignore`; add any new public
assets to that allowlist.

### Cloudflare Pages

If the site is deployed as a Pages project, configure the secret for that Pages
project instead:

```bash
npx wrangler pages secret put OPENAI_API_KEY --project-name <your-pages-project>
```

The Pages Function in `functions/api/routine.js` handles `POST /api/routine`.
Deploy the site through the Pages project; `npm run deploy` is for the Worker,
not Pages.

The browser keeps the recent chat transcript and sends it with each follow-up request so the routine responses remain contextual.

Selected products are saved in browser local storage, so they remain selected after a reload. Use a product's × button or "Clear all" to remove them.

Routine responses use OpenAI's live web-search tool and display a Sources section with clickable links when sources are returned.

Products can be filtered instantly by name or description keyword and by category.

The layout supports left-to-right and right-to-left modes. Use the language-direction control in the header to switch; the preference is saved locally.