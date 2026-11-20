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

The browser keeps the recent chat transcript and sends it with each follow-up request so the routine responses remain contextual.

Selected products are saved in browser local storage, so they remain selected after a reload. Use a product's × button or "Clear all" to remove them.

Routine responses use OpenAI's live web-search tool and display a Sources section with clickable links when sources are returned.

Products can be filtered instantly by name or description keyword and by category.

The layout supports left-to-right and right-to-left modes. Use the language-direction control in the header to switch; the preference is saved locally.