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

/**
 * @api {get} /variable To get a variable information.
 * @apiName getVariable
 * @apiGroup Variables
 * @apiParam {String} name Optional name of the variable.
 * @apiParam {String} appCode Type of app used [SLC/SNC].
 * @apiParam {String} varType Variable used in [ DASH : dashboard / LEAD : leaderboard ].
 * @apiError ErrorWhileFetchingInfo Error while fetching variable.
 * @apiErrorExample ErrorWhileFetchingInfo-Response:
 * {
 *   success: false,
 *   message: 'Error while fetching information'
 * }
 *@apiSuccessExample Response : 
 * {
 *   success: true,
 *   info: {
 *           "appCode": "SLC",
 *           "name": "title",
 *           "varType": "LEAD",
 *           "updatedOn": "2018-08-28T11:37:05.943Z",
 *           "value": "REFERRAL LEADERBOARD"
 *       }
 * }
 */
let getItems = (req, res) => {
  async.waterfall([
    (next) => {
      itemDbo.getItems({}, (error, result) => {
        if (error) {
          next({
            status: 500,
            message: '  Error while getting item information'
          }, null);
        } else {
          next(null, {
            status: 200,
            items: result
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
  updateItem
};