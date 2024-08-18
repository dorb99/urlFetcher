// Imports
const express = require('express');
const axios = require('axios');
const metascraper = require('metascraper')([
  require('metascraper-image')(),
  require('metascraper-title')(),
  require('metascraper-description')()
]);
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

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
  max: 100 //
});
app.use('/fetch-metadata', limiter);

// Metadata fetching endpoint
app.post('/fetch-metadata', async (req, res) => {
  const { urls } = req.body;
  const results = [];

  // Fetch metadata for each URL
  for (const url of urls) {
    try {
      const { data: html, request: { res: { responseUrl } } } = await axios.get(url);
      const metadata = await metascraper({ html, url: responseUrl });
      results.push(metadata);
    } catch (error) {
      results.push({ title: 'N/A', description: 'Could not fetch metadata', image: '' });
    }
  }

  res.json(results);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
