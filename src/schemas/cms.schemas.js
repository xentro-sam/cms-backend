const joi = require('joi');

const idValidation = joi.object({
  id: joi.number().required(),
});

module.exports = {
  idValidation,
};
