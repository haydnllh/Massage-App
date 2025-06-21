const errorHandler = (err, req, res, next) => {
  const status = 500;

  console.log(err.message)
  return res.status(status).json({
    message: err.message,
  });
};

module.exports = {
  errorHandler,
};
