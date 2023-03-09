const db = require('../../db/models');
// const CustomError = require('../utils/customError.utils');

const getContentTypes = async () => {
  const contentTypes = await db.ContentTypes.findAll();
  return contentTypes;
};

const createContentType = async (contentTypeName, contentTypeFields) => {
  const contentType = await db.ContentTypes.create({
    contentTypeName,
  });
  //   const contentTypeFieldsArray = contentTypeFields.split(',');
  //   const contentTypeFieldsArrayTrimmed = contentTypeFieldsArray.map((field) => field.trim());
  //   const contentTypeFieldsArrayTrimmedLowerCase = contentTypeFieldsArrayTrimmed.map((field) => field.toLowerCase());
  //   const contentTypeFieldsArrayTrimmedLowerCaseUnique = [...new Set(contentTypeFieldsArrayTrimmedLowerCase)];
  //   const contentTypeFieldsArrayTrimmedLowerCaseUniqueFormatted = contentTypeFieldsArrayTrimmedLowerCaseUnique.map((field) => {
  //     return {
  //       contentTypeField: field,
  //       contentTypeId: contentType.id,
  //     };
  //   });
  //   const contentTypeFieldsCreated = await db.ContentTypeFields.bulkCreate(contentTypeFieldsArrayTrimmedLowerCaseUniqueFormatted);
  //   return contentTypeFieldsCreated;
  // console.log(contentTypeFields);
  return contentType;
};

module.exports = {
  getContentTypes,
  createContentType,
};
