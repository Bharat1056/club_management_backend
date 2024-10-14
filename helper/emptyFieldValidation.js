const emptyFieldValidation = (fieldArray) => {
  let validationErrors = [];
  if (!fieldArray) validationErrors.push("fieldArray is required.");
  for (const requestField of fieldArray) {
    if (!requestField) validationErrors.push(`${requestField} is required.`);
  }
  if (validationErrors.length > 0) {
    throw new apiError(400, validationErrors[0]);
  }
};

export default emptyFieldValidation;