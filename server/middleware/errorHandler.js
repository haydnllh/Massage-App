const errorHandler = (err, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;

  return res.status(status).json({
    message: err.message,
    statusCode: status,
  });
};

module.exports = {
  errorHandler,
};
