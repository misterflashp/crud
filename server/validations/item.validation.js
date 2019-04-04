let joi = require('joi');

let getItems = (req, res, next) => {
  let getItemsSchema = joi.object().keys({
    start: joi.number(),
    count: joi.number(),
    searchKey: joi.string(),
    order: joi.string(),
    sortBy: joi.string()
  });
  let {
    error
  } = joi.validate(req.query, getItemsSchema);
  if (error) res.status(422).send({
    success: false,
    error
  });
  else next();
};

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

let addItem = (req, res, next) => {
  let addItemSchema = joi.object().keys({
    name: joi.string().required(),
    price: joi.number().required(),
  });
  let {
    error
  } = joi.validate(req.body, addItemSchema);
  if (error) res.status(422).send({
    success: false,
    error
  });
  else next();
};

let deleteItem = (req, res, next) => {
  let deleteItemSchema = joi.object().keys({
    itemId: joi.string().required()
  });
  let {
    error
  } = joi.validate(req.body, deleteItemSchema);
  if (error) res.status(422).send({
    success: false,
    error
  });
  else next();
};

module.exports = {
  updateItem,
  getItems,
  addItem,
  deleteItem
};