# Newsly

Newsly is a small Express application that scrapes news sources and stores articles in a database managed via [Sequelize](https://sequelize.org/). Optional enrichment tasks use the OpenAI API to extract M&A details. When extracting the acquiror, seller and target, the same request also classifies whether the article is about an "M&A" transaction, a "Financing" or "Other".
Articles can also be summarized with GPT, which provides the industry label. The Clairfield sector is derived separately using the embedding-based classifier.

## Prerequisites

- Node.js 18 or newer (the repo uses Node.js 22 via the `.replit` config)
- The server uses SQLite when `NODE_ENV` is not `production`. In production a
  Postgres connection is required via `DATABASE_URL`.
- Scraping sources, filters and prompts are stored in the same database as articles
- To run enrichment routes you must set the `OPENAI_API_KEY` environment variable

## Setup

Install dependencies using npm before running the server:

```bash
npm install
```

## Running the server

Start the server in either development or production mode:

```bash
npm run dev  # sets NODE_ENV=development
npm run prod # sets NODE_ENV=production
```

The default `npm start` command still runs `index.js` without setting
`NODE_ENV`. The server listens on the port defined by `PORT` or defaults to `3000`.

### Environment variables

- `OPENAI_API_KEY` – required for enrichment endpoints
- `PORT` – optional port number (defaults to `3000`)
- `NODE_ENV` – automatically set by the scripts above; `production` uses Postgres
- `DATABASE_URL` – Postgres connection string (required in production)
- `DEBUG` – set to `1` to log detailed DB operations

## Project structure

- `index.js` – main entry point and Express setup
- `db.js` – database helper using Sequelize
- `routes/` – route handlers for articles, sources and filters
- `lib/` – utility modules (scraping, filtering, enrichment)
- `public/` – static client pages
- `test/` – automated Node.js tests

## Testing

Run all tests with:

```bash
npm test
```

At the time of writing all **14** tests pass.

## Example commands

```bash
# start on a different port
PORT=4000 npm run dev
```

## Stopping the pipeline

Click the **Stop** button on the home page to cancel an in‑progress
scrape/enrich run. This sends a request to the `/stop-pipeline` endpoint
which halts the current streaming job.

## Keyword filters

Keyword filters support simple wildcards. Use `*` to match any sequence of
characters and `?` to match a single character. For example, a filter value of
`divest*` will match `divestiture` or `divests`.

