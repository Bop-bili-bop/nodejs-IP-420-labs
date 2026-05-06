function apiErrorHandler(err, req, res, next) {
  console.error("API Error:", err.message);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: {
      message: message,
      details: err.details || null
    }
  });
}

module.exports = apiErrorHandler;