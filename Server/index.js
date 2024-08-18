// Imports
import express from "express";

import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { fetcher } from "./src/Controller.js";

// Initialize Express app
const app = express();

// CORS options
const corsOptions = {
  origin: "http://localhost:5173",
};

// Middleware setup
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, //
});
app.use("/fetch-metadata", limiter);

// Metadata fetching endpoint
app.post("/fetch-metadata", async (req, res) => {
  const { urls } = req.body;
  const metadata = await fetcher(urls);
  res.json(metadata);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
