const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/mongo');
const { SearchQuestions } = require('./handlers/searchHandler');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let db;
connectDB().then((database) => {
  db = database;
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection failed:', error.message);
  process.exit(1); 
});

app.post('/search', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).send({ error: 'Search query is required' });
  }

  try {
    const results = await SearchQuestions({ request: { query }}, (error, response) => {
      if (error) {
        return res.status(500).send({ error: error.message });
      }
      return res.json(response);
    });
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.listen(5000, () => {
  console.log('HTTP server running on http://localhost:5000');
});
