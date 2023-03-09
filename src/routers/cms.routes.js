const express = require('express');
const cmsController = require('../controllers/cms.controllers');

const cmsRoutes = express.Router();

cmsRoutes.route('/contentTypes')
    .get(cmsController.getContentTypes)
    .post(cmsController.createContentType);

cmsRoutes.route('/contentTypes/:id')
    .get(cmsController.getContentType)
    .put(cmsController.updateContentType)
    .delete(cmsController.deleteContentType);

module.exports = cmsRoutes;
