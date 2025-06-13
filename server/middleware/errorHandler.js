const errorHandler = (err, req, res, next) => {
  const status = 500;

  return res.status(status).json({
    message: err.message,
  });
};

module.exports = {
  errorHandler,
};
