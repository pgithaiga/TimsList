var assert = require('assert');
var utils = {};

/* Send a success response back to the client
 *
 * @res response to send back
 * @content to attatch to the res
 */
utils.sendSuccessResponse = function(res, content) {
  res.status(200).json({
    content: content
  }).end();
};

/* Send an error response back to the client
 *
 * @res response to send back
 * @errcode of the response
 * @err message to attach to the response
 */
utils.sendErrResponse = function(res, errcode, err) {
  assert(errcode != null, "err response must have an errcode");
  assert(typeof errcode === "number", "err code must be a number");

  res.status(errcode).json({
    error: err
  }).end();
};

module.exports = utils;
