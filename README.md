# Newsly

Newsly is a small Express application that scrapes news sources and stores articles in a database managed via [Sequelize](https://sequelize.org/). Optional enrichment tasks use the OpenAI API to extract M&A details. When extracting the acquiror, seller and target, the same request also classifies whether the article is about an "M&A" transaction, a "Financing" or "Other".
Articles can also be summarized with sector and industry labels using GPT.

## Prerequisites

- Node.js 18 or newer (the repo uses Node.js 22 via the `.replit` config)
- The server uses SQLite by default but can connect to Postgres via `DATABASE_URL`
- Scraping sources, filters and prompts are stored in `config.db`
- To run enrichment routes you must set the `OPENAI_API_KEY` environment variable

## Setup

Install dependencies using npm before running the server:

```bash
npm install
```

## Running the server

Start the server with:

```bash
npm start
```

The server listens on the port defined by `PORT` or defaults to `3000`.

### Environment variables

- `OPENAI_API_KEY` – required for enrichment endpoints
- `PORT` – optional port number (defaults to `3000`)
- `DATABASE_URL` – optional Postgres connection string
- `CONFIG_DB_URL` – optional Postgres connection for config data

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
PORT=4000 npm start
```

## Keyword filters

Keyword filters support simple wildcards. Use `*` to match any sequence of
characters and `?` to match a single character. For example, a filter value of
`divest*` will match `divestiture` or `divests`.

