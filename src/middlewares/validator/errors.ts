export const missingPropertyError = (
  property: string,
  type: string
): string => {
  return `expected property ${property} of type ${type}`;
};

export const unexpectedTypeError = (
  property: string,
  expectedType: string,
  receivedType: string
): string => {
  return `Unexpected type for property ${property}: expected ${expectedType} received ${receivedType}`;
};
