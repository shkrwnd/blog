const httpError = require('http-errors');
const { HttpError } = require('http-errors');

const errorHandler = function (req, res, next) {
  if(res instanceof Error ) {
      const error = new HttpError(500);
      return next(error);
  }
  return next();
}

module.exports = errorHandler;
