export const handlerSaveError = (error, data, next) => {
  const { name, code } = error;
  console.log(error.message);
  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
    error.message = "Email in use";
  } else {
    error.status = 400;
  }

  next();
};

export const addUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
