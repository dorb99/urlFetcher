import express from "express";

import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { fetcher } from "./src/Controller.js";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://urlfetcherserver-93d9382076d0.herokuapp.com"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 1000,
  max: 5,
});
app.use(limiter);

app.post("/fetch-metadata", async (req, res) => {
  const { urls } = req.body;
  const metadata = await fetcher(urls);
  res.json(metadata);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
