let joi = require('joi');

// let getVariable = (req, res, next) => {
//   let getVariableSchema = joi.object().keys({
//     name: joi.string(),
//     appCode: joi.string().required(),
//     varType: joi.string().required()
//   });
//   let { error } = joi.validate(req.query, getVariableSchema);
//   if (error) res.status(422).send({
//     success: false,
//     error
//   });
//   else next();
// };

let updateItem = (req, res, next) => {
  let updateItemSchema = joi.object().keys({
    name: joi.string(),
    price: joi.number(),
    itemId: joi.string().required()
  });
  let {
    error
  } = joi.validate(req.body, updateItemSchema);
  if (error) res.status(422).send({
    success: false,
    error
  });
  else next();
};
module.exports = {
  updateItem
};