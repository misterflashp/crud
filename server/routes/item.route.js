let itemValidation = require('../validations/item.validation');
let itemController = require('../controllers/item.controller');
module.exports = (server) => {

  server.get('/items', itemController.getItems);

  server.put('/item', itemValidation.updateItem, itemController.updateItem);
};