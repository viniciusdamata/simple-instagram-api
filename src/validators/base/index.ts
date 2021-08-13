export default abstract class Validator {
  public abstract validate<T>(data: T): Promise<T>;
}
