const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/blogs', blogRoutes);

// Test database connection and sync models
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection failed:', err));

sequelize.sync({ force: false }) // Use force: true to reset tables during development
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Sync error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
