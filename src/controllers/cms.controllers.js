const cmsService = require('../services/cms.services');
const CustomError = require('../utils/customError.utils');

const getContentTypes = async (req, res) => {
  try {
    const contentTypes = await cmsService.getContentTypes();
    res.status(200).json(contentTypes);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message});
    } else {
      res.status(500).json({error: error.message});
    }
  }
};

const createContentType = async (req, res) => {
  try {
    const {contentTypeName, contentTypeFields} = req.body;
    const contentType = await cmsService.createContentType(contentTypeName, contentTypeFields);
    res.status(201).json(contentType);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message});
    } else {
      res.status(500).json({error: error.message});
    }
  }
};

const getContentType = async (req, res) => {
  try {
    const {id} = req.params;
    const contentTypeEntries = await cmsService.getContentTypeEntries(id);
    res.status(200).json(contentTypeEntries);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message});
    } else {
      res.status(500).json({error: error.message});
    }
  }
};

const createContentTypeEntry = async (req, res) => {
  try {
    const {id} = req.params;
    const entry = req.body;
    const contentTypeEntry = await cmsService.createContentTypeEntry(id, entry);
    res.status(201).json(contentTypeEntry);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message});
    } else {
      res.status(500).json({error: error.message});
    }
  }
};

const updateContentType = async (req, res) => {
  try {
    const {id} = req.params;
    const {contentTypeName, contentTypeFields, operation} = req.body;
    const contentType = await cmsService.updateContentType(id, contentTypeName, contentTypeFields, operation);
    res.status(200).json(contentType);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message});
    } else {
      res.status(500).json({error: error.message});
    }
  }
};

const deleteContentTypeEntry = async (req, res) => {
  try {
    const {id, entryId} = req.params;
    const contentType = await cmsService.deleteContentTypeEntry(id, entryId);
    res.status(200).json(contentType);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message});
    } else {
      res.status(500).json({error: error.message});
    }
  }
};

const updateContentTypeEntry = async (req, res) => {
  try {
    const {id, entryId} = req.params;
    const entry = req.body;
    const contentType = await cmsService.updateContentTypeEntry(id, entryId, entry);
    res.status(200).json(contentType);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message});
    } else {
      res.status(500).json({error: error.message});
    }
  }
};

const deleteContentType = async (req, res) => {
  try {
    const {id} = req.params;
    const contentType = await cmsService.deleteContentType(id);
    res.status(200).json(contentType);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message});
    } else {
      res.status(500).json({error: error.message});
    }
  }
};

const getContentTypeFields = async (req, res) => {
  try {
    const {id} = req.params;
    const contentTypeFields = await cmsService.getContentTypeFields(id);
    res.status(200).json(contentTypeFields);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message});
    } else {
      res.status(500).json({error: error.message});
    }
  }
};


module.exports = {
  getContentTypes,
  createContentType,
  getContentType,
  updateContentType,
  deleteContentTypeEntry,
  createContentTypeEntry,
  updateContentTypeEntry,
  deleteContentType,
  getContentTypeFields,
};
