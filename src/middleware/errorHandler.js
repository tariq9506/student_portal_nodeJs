const errorHandler = (err, req, res, next) => {
  // Use 500 if status not manually set or still 200
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode); // make sure response has proper status
  let response = {};

  switch (statusCode) {
    case 400:
      response = { title: "Bad Request", message: err.message };
      break;
    case 401:
      response = { title: "Unauthorized", message: err.message };
      break;
    case 404:
      response = { title: "Not Found", message: err.message };
      break;
    case 500:
      response = { title: "Internal Server Error", message: err.message };
      break;
    case 502:
      response = { title: "Bad Gateway", message: err.message };
      break;
    default:
      response = { title: "Unexpected Error", message: err.message };
      break;
  }

  // Always include stack trace optionally (only once)
  response.stack = process.env.NODE_ENV === "production" ? null : err.stack;

  // ✅ Send response exactly once
  res.json(response);
};


module.exports=errorHandler;


