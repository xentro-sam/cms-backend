const {idValidation} = require('../schemas/cms.schemas');

const validateId = (req, res, next) => {
  const {id, entryId} = req.params;
  const {error} = idValidation.validate({id});
  if (error) {
    res.status(400);
    res.json({message: error.message});
    return;
  }
  if (entryId) {
    const {error} = idValidation.validate({id: entryId});
    if (error) {
      res.status(400);
      res.json({message: error.message});
      return;
    }
  }
  next();
};

module.exports = {
  validateId,
};
