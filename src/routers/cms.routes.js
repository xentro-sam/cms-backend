const express = require('express');
const cmsController = require('../controllers/cms.controllers');

const cmsRoutes = express.Router();

cmsRoutes.route('/contentTypes')
    .get(cmsController.getContentTypes)
    .post(cmsController.createContentType);

cmsRoutes.route('/contentTypes/:id')
    .get(cmsController.getContentType)
    .post(cmsController.createContentTypeEntry)
    .put(cmsController.updateContentType)
    .delete(cmsController.deleteContentType);

cmsRoutes.route('/contentTypes/:id/:entryId')
    .delete(cmsController.deleteContentTypeEntry)
    .put(cmsController.updateContentTypeEntry);

module.exports = cmsRoutes;
