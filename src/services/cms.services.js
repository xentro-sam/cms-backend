const db = require('../../db/models');
const CustomError = require('../utils/customError.utils');
const {dynamicTableCreator} = require('../utils/dynamicTableCreation.utils');

const getContentTypes = async () => {
  const contentTypes = await db.ContentTypes.findAll();
  return contentTypes;
};

const createContentType = async (contentTypeName, contentTypeFields) => {
  const contentTypeExists = await db.ContentTypes.findOne({
    where: {
      contentTypeName,
    },
  });
  if (contentTypeExists) {
    throw new CustomError(400, 'ContentType already exists');
  }
  const contentType = await db.ContentTypes.create({
    contentTypeName,
  });
  const contentTypeTable = await db.TablesList.create({
    tableName: `Table_${contentType.id}`,
    ContentTypeId: contentType.id,
  });
  const contentTypeFieldsArrayTrimmed = contentTypeFields.map((field) => field.trim());
  const contentTypeFieldsArrayTrimmedLowerCase = contentTypeFieldsArrayTrimmed.map((field) => field.toLowerCase());
  const contentTypeFieldsArrayTrimmedLowerCaseUnique = [...new Set(contentTypeFieldsArrayTrimmedLowerCase)];
  dynamicTableCreator(contentTypeTable.tableName, contentTypeFieldsArrayTrimmedLowerCaseUnique);
  return contentType;
};

const getContentTypeEntries = async (id) => {
  const contentTypeTable = await db.TablesList.findOne({
    where: {
      ContentTypeId: id,
    },
  });
  const dynamicTable = db.sequelize.model(contentTypeTable.tableName);
  const contentTypeEntries = await dynamicTable.findAll();
  return contentTypeEntries;
};

const createContentTypeEntry = async (id, entry) => {
  const contentTypeTable = await db.TablesList.findOne({
    where: {
      ContentTypeId: id,
    },
  });
  const dynamicTable = db.sequelize.model(contentTypeTable.tableName);
  const contentTypeEntry = await dynamicTable.create(entry);
  return contentTypeEntry;
};

const deleteContentTypeEntry = async (id, entryId) => {
  const contentTypeTable = await db.TablesList.findOne({
    where: {
      ContentTypeId: id,
    },
  });
  const dynamicTable = db.sequelize.model(contentTypeTable.tableName);
  const contentTypeEntry = await dynamicTable.destroy({
    where: {
      id: entryId,
    },
  });
  if (!contentTypeEntry) throw new CustomError(404, 'Entry not found');
  return {message: 'Entry deleted successfully'};
};


module.exports = {
  getContentTypes,
  createContentType,
  getContentTypeEntries,
  createContentTypeEntry,
  deleteContentTypeEntry,
};
