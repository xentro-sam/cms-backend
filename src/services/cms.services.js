const db = require('../../db/models');
const CustomError = require('../utils/customError.utils');
const tableCreation = require('../utils/dynamicTableCreation.utils');

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
  tableCreation.dynamicTableCreator(contentTypeTable.tableName, contentTypeFieldsArrayTrimmedLowerCaseUnique);
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

const updateContentTypeEntry = async (id, entryId, entry) => {
  const contentTypeTable = await db.TablesList.findOne({
    where: {
      ContentTypeId: id,
    },
  });
  const dynamicTable = db.sequelize.model(contentTypeTable.tableName);
  const contentTypeEntry = await dynamicTable.update(entry, {
    where: {
      id: entryId,
    },
  });
  if (!contentTypeEntry[0]) throw new CustomError(404, 'Entry not found');
  return {message: 'Entry updated successfully'};
};

const updateContentType = async (id, contentTypeName, contentTypeFields, operation) => {
  const contentType = await db.ContentTypes.findOne({
    where: {
      id,
    },
  });
  if (!contentType) throw new CustomError(404, 'ContentType not found');
  if (contentTypeName) {
    contentType.contentTypeName = contentTypeName;
  }
  if (contentTypeFields) {
    const contentTypeTable = await db.TablesList.findOne({
      where: {
        ContentTypeId: id,
      },
    });
    const dynamicTable = db.sequelize.model(contentTypeTable.tableName);
    const contentTypeFieldsArrayTrimmed = contentTypeFields.map((field) => field.trim());
    const contentTypeFieldsArrayTrimmedLowerCase = contentTypeFieldsArrayTrimmed.map((field) => field.toLowerCase());
    const contentTypeFieldsArrayTrimmedLowerCaseUnique = [...new Set(contentTypeFieldsArrayTrimmedLowerCase)];
    if (operation === 'add') {
      let tableAttributes = dynamicTable.rawAttributes;
      tableAttributes = Object.keys(tableAttributes);
      tableAttributes = tableAttributes.filter((attribute) => attribute !== 'id');
      tableAttributes = [...tableAttributes, ...contentTypeFieldsArrayTrimmedLowerCaseUnique];
      tableCreation.dynamicTableCreator(contentTypeTable.tableName, tableAttributes);
      await db.sequelize.sync({alter: true});
    } else if (operation === 'remove') {
      let tableAttributes = dynamicTable.rawAttributes;
      tableAttributes = Object.keys(tableAttributes);
      if (tableAttributes.length === 1) throw new CustomError(400, 'Cannot remove all fields from a ContentType');
      contentTypeFieldsArrayTrimmedLowerCaseUnique.forEach((field) => {
        if (!tableAttributes.includes(field)) throw new CustomError(400, `Field ${field} does not exist`);
      });
      tableAttributes = tableAttributes.filter((attribute) => attribute !== 'id');
      tableAttributes = tableAttributes.filter((attribute) => !contentTypeFieldsArrayTrimmedLowerCaseUnique.includes(attribute));
      tableCreation.dynamicTableCreator(contentTypeTable.tableName, tableAttributes);
      await db.sequelize.sync({alter: true});
    }
  }
  await contentType.save();
  return {message: 'ContentType updated successfully'};
};

const deleteContentType = async (id) => {
  const contentType = await db.ContentTypes.findOne({
    where: {
      id,
    },
  });
  if (!contentType) throw new CustomError(404, 'ContentType not found');
  const contentTypeTable = await db.TablesList.findOne({
    where: {
      ContentTypeId: id,
    },
  });
  const dynamicTable = db.sequelize.model(contentTypeTable.tableName);
  await dynamicTable.drop();
  await contentTypeTable.destroy();
  await contentType.destroy();
  return {message: 'ContentType deleted successfully'};
};

const getContentTypeFields = async (id) => {
  const contentTypeTable = await db.TablesList.findOne({
    where: {
      ContentTypeId: id,
    },
  });
  const dynamicTable = db.sequelize.model(contentTypeTable.tableName);
  let tableAttributes = dynamicTable.rawAttributes;
  tableAttributes = Object.keys(tableAttributes);
  tableAttributes = tableAttributes.filter((attribute) => attribute !== 'id' && attribute !== 'createdAt' && attribute !== 'updatedAt');
  return tableAttributes;
};


module.exports = {
  getContentTypes,
  createContentType,
  getContentTypeEntries,
  createContentTypeEntry,
  deleteContentTypeEntry,
  updateContentTypeEntry,
  updateContentType,
  deleteContentType,
  getContentTypeFields,
};
