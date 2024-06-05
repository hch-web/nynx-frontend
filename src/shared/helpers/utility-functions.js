export const isBadRequest = error => error !== undefined && 'data' in error && error.status === 400;

export const isUnexpectedError = error => error !== undefined && 'data' in error && error.status === 500;

export const isPasswordValid = value => {
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumberSymbole = /[0-9]/.test(value) || /[!@#%&]/.test(value);
  let validConditions = 0;
  const numberOfMustBeValidConditions = 3;
  const conditions = [hasLowerCase, hasUpperCase, hasNumberSymbole];
  // eslint-disable-next-line no-plusplus
  conditions.forEach(condition => (condition ? validConditions++ : null));
  if (validConditions >= numberOfMustBeValidConditions) {
    return true;
  }
  return false;
};

export const isAttributeExistInValues = (attributes, attribute) => attributes?.some(element => element?.attribute_value === attribute?.attribute_value);

export const removeAttribute = (attributes, attribute) => attributes?.filter(element => element?.attribute_value !== attribute?.attribute_value);

export const findSameTypeAttributes = (attributes, attributeTypeId) => attributes?.filter(element => element?.attribute_type === attributeTypeId).length;

export const checkAttributeLimit = (attributes, attributeTypeId, limit) => {
  const sameAttributeTypeLength = findSameTypeAttributes(attributes, attributeTypeId);

  return sameAttributeTypeLength > limit - 1;
};

export const checkLimitOfArrayList = (list, limitVariable) => {
  if (list?.length > 0) return list[0]?.[limitVariable];
  return 0;
};
