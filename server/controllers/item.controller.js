let async = require('async');
let lodash = require('lodash');
let itemDbo = require('../dbos/item.dbo');

let updateItem = (req, res) => {
  let {
    itemId
  } = req.body;
  let details = req.body;
  details.updatedOn = new Date();
  async.waterfall([
    (next) => {
      itemDbo.getItems({
        _id: itemId
      }, (error, result) => {
        if (error) {
          next({
            status: 500,
            message: '  Error while getting item information'
          }, null);
        } else if (result && result.length) {
          next(null);
        } else {
          next({
            status: 400,
            message: "No item exists with given ID"
          }, null);
        }
      });
    }, (next) => {
      itemDbo.updateItem(details, (error, result) => {
        if (error) {
          next({
            status: 500,
            message: "Error while updating item"
          }, null);
        } else {
          next(null, {
            status: 200,
            message: "Item Updated",
            item: result
          });
        }
      });
    }
  ], (error, result) => {
    let response = Object.assign({
      success: !error
    }, error || result);
    let status = response.status;
    delete(response.status);
    res.status(status).send(response);
  });
}

let addItem = (req, res) => {
  let {
    name,
    price
  } = req.body;
  let details = req.body;
  details.updatedOn = new Date();
  async.waterfall([
    (next) => {
      itemDbo.getItems({
        name
      }, (error, result) => {
        if (error) {
          next({
            status: 500,
            message: '  Error while getting item information'
          }, null);
        } else if (result && result.length) {
          next({
            status: 400,
            message: "Item name already exists"
          }, null);
        } else {
          next(null);
        }
      });
    }, (next) => {
      itemDbo.addItem(details, (error, result) => {
        if (error) {
          next({
            status: 500,
            message: "Error while adding item"
          }, null);
        } else {
          next(null, {
            status: 200,
            message: "Item Added successfully",
            item: result
          });
        }
      });
    }
  ], (error, result) => {
    let response = Object.assign({
      success: !error
    }, error || result);
    let status = response.status;
    delete(response.status);
    res.status(status).send(response);
  });
}

let getItems = (req, res) => {
  let {
    sortBy,
    start,
    count,
    order,
    searchKey
  } = req.query;
  if (!sortBy) sortBy = 'name';
  if (!start) start = 0;
  if (!count) count = 25;
  if (!order) order = 'asc';
  let searched = [];
  start = parseInt(start, 10);
  count = parseInt(count, 10);
  let end = start + count;
  async.waterfall([
    (next) => {
      itemDbo.getItems({}, (error, result) => {
        if (error) {
          next({
            status: 500,
            message: '  Error while getting item information'
          }, null);
        } else {
          next(null, result);
        }
      });
    },
    (result, next) => {
      let final = [];
      if (searchKey) {
        searchKey = searchKey.toLowerCase();
        lodash.forEach(result,
          (fin) => {
            if ((fin.name).toLowerCase().indexOf(searchKey) > -1) {
              searched.push(fin);
            }
          });
        final = searched;
        next(null, final);
      } else {
        final = result;
        next(null, final);
      }
    }, (final, next) => {
      let final2 = lodash.orderBy(final, [item => (sortBy == "name") ? item.name.toLowerCase() : item[sortBy]], [order])
      final = final2.slice(start, end);
      next(null, {
        status: 200,
        items: final
      });
    }
  ], (error, result) => {
    let response = Object.assign({
      success: !error
    }, error || result);
    let status = response.status;
    delete(response.status);
    res.status(status).send(response);
  });
}

let deleteItem = (req, res) => {
  let {
    itemId
  } = req.body;
  async.waterfall([
    (next) => {
      itemDbo.getItems({
        _id: itemId
      }, (error, result) => {
        if (error) {
          next({
            status: 500,
            message: '  Error while getting item information'
          }, null);
        } else if (result && result.length) {
          next(null);
        } else {
          next({
            status: 400,
            message: "No item exists with given ID"
          }, null);
        }
      });
    }, (next) => {
      itemDbo.deleteItem({
        _id: itemId
      }, (error, result) => {
        if (error) {
          next({
            status: 500,
            message: "Error while updating item"
          }, null);
        } else {
          next(null, {
            status: 200,
            message: "Item deleted successfully"
          });
        }
      });
    }
  ], (error, result) => {
    let response = Object.assign({
      success: !error
    }, error || result);
    let status = response.status;
    delete(response.status);
    res.status(status).send(response);
  });
}
module.exports = {
  getItems,
  updateItem,
  addItem,
  deleteItem
};