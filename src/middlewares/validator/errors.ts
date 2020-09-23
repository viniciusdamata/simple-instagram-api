export const missingPropertyError = (property: string, type: string) => {
  return `expected property ${property} of type ${type}`;
};

export const unexpectedTypeError = (
  property: string,
  expectedType: string,
  receivedType: string
) => {
  return `Unexpected type for property ${property}: expected ${expectedType} received ${receivedType}`;
};
