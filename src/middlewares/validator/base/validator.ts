import { missingPropertyError, unexpectedTypeError } from "../errors";
import { Request, Response } from "express";

class Validator<T> {
  private entity: T;

  constructor(entity: T) {
    this.entity = entity;
  }

  validate = (req: Request, res: Response, next: () => void) => {
    const errors = [];

    if (!req.body) {
      errors.push("body is null");
    } else {
      const { body } = req;
      for (const key in this.entity) {
        if (this.entity.hasOwnProperty(key)) {
          const element: unknown = this.entity[key];
          if (!body[key]) {
            errors.push(missingPropertyError(key, element as string));
          } else if (typeof body[key] !== element) {
            errors.push(
              // * isso aqui seria legal se no post não fosse tudo convertido pra string kkk
              unexpectedTypeError(key, element as string, typeof body[key])
            );
          }
        }
      }
    }
    if (errors.length > 0) {
      res.status(400).json({ errors });
    } else {
      next();
    }
  };
}

export default Validator;
