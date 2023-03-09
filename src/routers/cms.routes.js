const express = require('express');
const cmsController = require('../controllers/cms.controllers');

const cmsRoutes = express.Router();

cmsRoutes.route('/contentTypes')
    .get(cmsController.getContentTypes)
    .post(cmsController.createContentType);
// .delete(cmsController.deleteContentType);

cmsRoutes.route('/contentTypes/:id')
    .get(cmsController.getContentType)
    .post(cmsController.createContentTypeEntry)
    .put(cmsController.updateContentType)
    .delete(cmsController.deleteContentTypeEntry);

module.exports = cmsRoutes;
