const baseValidator = require("./validator");

const postValidator = baseValidator({
  author: {
    type: "string",
    required: true,
  },
  place: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  hashtags: {
    type: "string",
    required: true,
  },
});

module.exports = postValidator;
