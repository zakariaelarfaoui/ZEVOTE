const errorHandler = (error, _req, res, _next) => {
  console.log(error.message);
  if (error.status && error.message) {
    return res.status(error.status).json({ message: error.message });
  } else {
    return res
      .status(500)
      .json({ message: "Something went wrong try again later" });
  }
};

export default errorHandler;
