const express = require('express');
const app = express();
const cmsRoutes = require('./src/routers/cms.routes');
require('dotenv').config();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(cmsRoutes);

app.listen(PORT, () => {
  console.log(`CMS Server is running on port ${PORT}`);
});
