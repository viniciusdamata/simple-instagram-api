import { validate as create } from "./create";
import { validate as list } from "./list";

const postValidator = { list, create };

export { postValidator };
