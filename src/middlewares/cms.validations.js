const {idValidation} = require('../schemas/cms.schemas');

const validateId = (req, res, next) => {
  const {id, entryId} = req.params;
  try {
    idValidation.validate({id});
    if (entryId) {
      idValidation.validate({id: entryId});
    }
  } catch (error) {
    res.status(400);
    res.json({message: error.message});
    return;
  }
  next();
};

module.exports = {
  validateId,
};
