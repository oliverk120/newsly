const express = require("express");
const path = require("path");
const db = require("./db");
const configDb = require("./configDb");

const logger = require("./logger");

const app = express();
const PORT = process.env.PORT || 3000;
const initDb = require("./db/init");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Initialize SQLite database via external module

async function startServer() {
  try {
    await initDb();
  } catch (err) {
    logger.error("Failed to init db", err);
    process.exit(1);
  }

  app.use("/articles", require("./routes/articles"));
  app.use("/sources", require("./routes/sources"));
  app.use("/filters", require("./routes/filters"));
  app.use("/prompts", require("./routes/prompts"));
  app.use("/pipeline", require("./routes/pipeline"));
  app.use("/", require("./routes/pipelineAdmin"));

  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`Server running on port ${PORT}`);
  });

  // Run the full scrape & enrich pipeline once every 24 hours
  const DAY_MS = 24 * 60 * 60 * 1000;
  setInterval(runScheduledPipeline, DAY_MS);

  // Hourly log to verify timers are active
  const HOUR_MS = 60 * 60 * 1000;
  setInterval(() => {
    logger.info(`Hourly timer tick at ${new Date().toISOString()}`);
  }, HOUR_MS);
}

startServer();

// Endpoint to get article statistics
app.get("/stats", async (req, res) => {
  try {
    const rows = await db.all("SELECT link FROM articles");
    const bySource = {};
    rows.forEach((r) => {
      try {
        const origin = new URL(r.link).origin;
        bySource[origin] = (bySource[origin] || 0) + 1;
      } catch (e) {}
    });

    const row = await db.get(
      "SELECT COUNT(*) as total, MAX(created_at) as latestScrape, MIN(created_at) as earliestScrape, MIN(time) as earliestArticle FROM articles",
    );
    res.json({
      total: row.total,
      latest: row.latestScrape,
      earliestScrape: row.earliestScrape,
      earliestArticle: row.earliestArticle,
      bySource,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Failed to retrieve stats" });
  }
});


// Run the full scrape & enrich pipeline once every 24 hours
async function runScheduledPipeline() {
  try {
    const res = await fetch(`http://localhost:${PORT}/scrape-enrich`);
    const data = await res.json();
    logger.info(`Scheduled pipeline result: ${JSON.stringify(data)}`);
  } catch (err) {
    logger.error("Scheduled pipeline failed", err);
  }
}
