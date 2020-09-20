const { missingPropertyError, unexpectedTypeError } = require("./errors");

module.exports = function (entity) {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  const validateFunction = (req, res, next) => {
    const errors = [];

    if (!req.body) {
      errors.push("body is null");
      res.status(400).json({ errors: errors });
    } else if (Object.keys(req.body).length == 0) {
      for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
          const element = entity[key];
          errors.push(missingPropertyError(key, element.type));
        }
      }
    } else {
      const { body } = req;
      // * isso aqui seria legal se no post não fosse tudo convertido pra string kkk
      for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
          const element = entity[key];
          if (!body[key]) {
            errors.push(missingPropertyError(key, element.type));
          } else if (typeof body[key] != element.type) {
            errors.push(
              unexpectedTypeError(key, element.type, typeof body[key])
            );
          }
        }
      }
    }
    if (errors.length > 0) {
      res.status(400).json({ errors: errors });
    } else {
      next();
    }
  };

  return validateFunction;
};
