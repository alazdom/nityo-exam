// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);  // Use the routes for the /api prefix

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
