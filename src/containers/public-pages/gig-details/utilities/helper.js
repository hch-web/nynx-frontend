export const findAdhocFeaturePrice = features => features?.find(field => field?.is_adhoc_feature && field.field_type === 'price');

export const findAdhocFeatureDescription = features => features?.find(field => field?.is_adhoc_feature && field.field_type === 'textarea');

export const findMonthlyFeaturePrice = features => features?.find(field => !field?.is_adhoc_feature && field.field_type === 'price');

export const findMonthlyFeatureDescription = features => features?.find(field => !field?.is_adhoc_feature && field.field_type === 'textarea');

export const findAdhocDeadlineFeatureField = features => features?.find(field => field?.is_adhoc_feature && field.field_type === 'deadline');

export const filterAdhocFields = features => features?.filter(
  field => field?.is_adhoc_feature && field.field_type !== 'price' && field.field_type !== 'textarea'
);

export const filterMonthlyFields = features => features?.filter(field => !field?.is_adhoc_feature && field.field_type !== 'price' && field.field_type !== 'textarea');
