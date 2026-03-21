require("dotenv").config({ override: true });
const app = require("./app");
const mongoose = require("mongoose");
const logger = require("./src/utils/logger");
const port = process.env.PORT || 5000;

// Connect to MongoDB
async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL);
    logger.info("✅ MongoDB Successfully Connected!");

    app.listen(port, () => {
      logger.info(`✅ App listening on port ${port}`);
    });
  } catch (err) {
    logger.error("❌ Failed to start server:", { stack: err.stack });
    process.exit(1);
  }
}

startServer();
