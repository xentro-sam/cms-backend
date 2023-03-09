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

module.exports = {
  getContentTypes,
  createContentType,
};
