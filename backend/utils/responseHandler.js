/** @format */

function responseHandler(res, body, status = 200) {
  res.status(status).json(body);
}

module.exports = responseHandler;
