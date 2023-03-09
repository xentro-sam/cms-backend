const express = require('express');
const app = express();
const cmsRoutes = require('./src/routers/cms.routes');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cmsRoutes);

app.listen(PORT, () => {
  console.log(`CMS Server is running on port ${PORT}`);
});
