import { ObjectSchema } from "yup";
import { Assign } from "yup/lib/object";

export class Validator<T> {
  constructor(
    private schema: ObjectSchema<
      Assign<
        T & {
          [key: string]: any;
        },
        any
      >
    >
  ) {}

  async validate(data: T): Promise<T> {
    return await this.schema.validate(data);
  }
}
