# Newsly

Newsly is a small Express application that scrapes news sources and stores articles in a SQLite database. Optional enrichment tasks use the OpenAI API to extract M&A details. When extracting the acquiror, seller and target, the same request also classifies whether the article is about an "M&A" transaction, a "Financing" or "Other".

## Prerequisites

- Node.js 18 or newer (the repo uses Node.js 22 via the `.replit` config)
- If you plan to run enrichment routes, set the `OPENAI_API_KEY` environment variable

## Setup

Install dependencies using npm:

```bash
npm install
```

## Running the server

Start the server with:

```bash
npm start
```

The server listens on the port defined by `PORT` or defaults to `3000`.

## Project structure

- `index.js` – main entry point and Express setup
- `db.js` – SQLite database connection
- `routes/` – route handlers for articles, sources and filters
- `lib/` – utility modules (scraping, filtering, enrichment)
- `public/` – static client pages
- `test/` – automated Node.js tests

## Testing

Run all tests with:

```bash
npm test
```

At the time of writing all **8** tests pass.

## Example commands

```bash
# start on a different port
PORT=4000 npm start
```

