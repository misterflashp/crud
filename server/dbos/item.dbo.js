let itemModel = require('../models/item.model');

let getItems = (object, cb) => {
  itemModel.find(object, {
    createdOn: 0
  }, (error, result) => {
    if (error) cb(error, null);
    else cb(null, result || []);
  });
}

let updateItem = (object, cb) => {
  let {
    itemId
  } = object;
  delete object.itemId;
  itemModel.updateOne({
    _id: itemId
  }, {
    $set: object
  }, {
    upsert: true
  }, (error, result) => {
    if (error) cb(error, null);
    else cb(null, result);
  })

}

let addItem = (obj, cb) => {
  let item = new itemModel(obj);
  item.save((error, result) => {
    if (error) cb(error, null);
    else cb(null, result || []);
  });
}

let deleteItem = (obj, cb) => {
  itemModel.findOneAndDelete(obj,
    (error, result) => {
      if (error) cb(error, null);
      else cb(null, result || []);
    })
}
module.exports = {
  getItems,
  updateItem,
  addItem,
  deleteItem
};