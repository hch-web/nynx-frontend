export const formatName = (firstName, lastName, userName) => (!!firstName && !!lastName ? `${firstName} ${lastName[0]}` : userName);

const formatDeliveryDays = deliveryDays => {
  if (deliveryDays === '1') {
    return 'Express 24H';
  }
  if (deliveryDays === '3') {
    return 'Up to 3 days';
  }
  if (deliveryDays === '7') {
    return 'Up to 7 days';
  }
  return deliveryDays;
};

export const getFormattedFilterLabels = (key, filterValues) => {
  if (key === 'delivery_time') {
    return formatDeliveryDays(filterValues[key]);
  }

  return filterValues[key];
};
