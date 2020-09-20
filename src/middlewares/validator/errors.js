exports.missingPropertyError = (property, type) => {
  return `expected property ${property} of type ${type}`;
};

exports.unexpectedTypeError = (property, expectedType, receivedType) => {
  return `Unexpected type for property ${property}: expected ${expectedType} received ${receivedType}`;
};
