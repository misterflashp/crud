let itemValidation = require('../validations/item.validation');
let itemController = require('../controllers/item.controller');

module.exports = (server) => {
  server.get('/items', itemValidation.getItems, itemController.getItems);
  server.put('/item', itemValidation.updateItem, itemController.updateItem);
  server.post('/item', itemValidation.addItem, itemController.addItem);
  server.put('/item/delete', itemValidation.deleteItem, itemController.deleteItem);
};