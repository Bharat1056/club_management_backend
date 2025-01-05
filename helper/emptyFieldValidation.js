import apiError from "../utils/apiError.js";

const emptyFieldValidation = (fields) => {
  const validationErrors = [];
  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    if (!fieldValue) {
      validationErrors.push(`${fieldName} is required.`);
    }
  }
  if (validationErrors.length > 0) {
    throw new apiError(400, validationErrors[0]); // Return the first error.
  }
};

export default emptyFieldValidation;