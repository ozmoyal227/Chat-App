import path from "path";
import express from "express";
import dotenv from "dotenv";
import dbInit from "./db/init.js";

dotenv.config();

try {
  // =============
  // DB
  // =============
  dbInit();

  // =============
  // Server
  // =============
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/index.html"));
  });

  app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
} catch (error) {
  console.log(`Error starting server`);
}
