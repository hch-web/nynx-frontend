import { DEFAULT_CUSTOMFIELD_CHAR_LIMIT, DEFAULT_FIELD_MAX_WORDS } from 'utilities/constants';
import { v4 as uuidv4 } from 'uuid';

// overView Tab
export const transformSearchTags = tags => tags?.map(item => ({
  id: uuidv4(),
  tag: item.tag,
}));

export const checkIsSameTagExist = (tags, tag) => tags?.some(element => element.tag === tag);

// Pricing Tab
export const toggleAdhocFeaturesField = (features, shouldFilterAdhocFields) => features?.filter(item => item?.attributes.isadhoc === shouldFilterAdhocFields);

export const transformOptions = optionsArray => optionsArray?.map(item => ({ label: item, value: item }));

export const transformUpdatedInitialValues = (
  features,
  profile,
  subcategoryid,
  isAdhocThreeTier,
  isMonthlyThreeTier
) => features?.map((item, index) => ({
  feature: item.feature,
  basic: item?.basic || '',
  standard: item?.standard || '',
  premium: item?.premium || '',
  is_required: item?.is_required || false,
  isCustomField: item?.is_custom_field || false,
  attributes: {
    index,
    type: item?.field_type || '',
    profile,
    subcategoryid,
    gig: item?.gig,
    isthreetier: item?.is_adhoc_feature ? isAdhocThreeTier : isMonthlyThreeTier,
    placeholder: item?.placeholder || '',
    title: item?.field_name || '',
    isRequired: item?.is_required || false,
    wordsCounter: item?.is_custom_field ? true : item?.has_word_limit || false,
    isadhoc: item.is_adhoc_feature,
    maxWords: item?.is_custom_field
      ? DEFAULT_CUSTOMFIELD_CHAR_LIMIT
      : item?.max_characters || DEFAULT_FIELD_MAX_WORDS,
    options: transformOptions(item.select_options || []),
  },
}));

export const transformInitalValues = features => features?.map((item, index) => ({
  feature: item.id,
  basic: item?.basic || '',
  standard: item?.standard || '',
  premium: item?.premium || '',
  is_required: item?.is_required || false,
  isCustomField: item?.is_custom_field || false,
  attributes: {
    index,
    type: item?.field_type || '',
    placeholder: item?.placeholder || '',
    title: item?.field_name || '',
    isRequired: item?.is_required || false,
    wordsCounter: item?.is_custom_field ? true : item?.has_word_limit || false,
    isadhoc: item.is_adhoc_feature || false,
    isthreetier: true,
    maxWords: item?.is_custom_field
      ? DEFAULT_CUSTOMFIELD_CHAR_LIMIT
      : item?.max_characters || DEFAULT_FIELD_MAX_WORDS,
    options: transformOptions(item.select_options || []),
  },
}));

export const transformedSelectedValues = (features, currentFeatures, subcategoryid, profileId) => features?.map((item, index) => ({
  feature: item.feature || item.id,
  basic: item?.basic || '',
  standard: item?.standard || '',
  premium: item?.premium || '',
  is_required: item?.is_required || false,
  isCustomField: item?.is_custom_field || false,
  attributes: {
    index: currentFeatures.length + index,
    type: item?.field_type || '',
    placeholder: item?.placeholder || '',
    title: item?.field_name || '',
    isthreetier: true,
    profile: profileId,
    subcategoryid,
    gig: item?.gig,
    isRequired: item?.is_required || false,
    wordsCounter: item?.has_word_limit || false,
    isadhoc: item.is_adhoc_feature || false,
    maxWords: item?.max_characters || DEFAULT_FIELD_MAX_WORDS,
    options: transformOptions(item.select_options || []),
  },
}));

export const tranformedAdhocFeaturesForValidation = (features, target) => features?.map(item => ({
  feature: item.feature,
  basic: item?.basic || '',
  standard: item?.standard || '',
  premium: item?.premium || '',
  is_required: item?.is_required || false,
  isCustomField: item?.isCustomField || false,
  attributes: {
    index: item.attributes.index,
    type: item?.attributes.type || '',
    placeholder: item?.attributes.placeholder || '',
    isthreetier: item.attributes.isadhoc ? target : item.attributes.isthreetier,
    profile: item?.attributes?.profile,
    subcategoryid: item?.attributes?.subcategoryid,
    gig: item?.attributes?.gig,
    title: item?.attributes.title || '',
    isRequired: item?.attributes.isRequired || false,
    wordsCounter: item?.attributes.wordsCounter || false,
    isadhoc: item.attributes.isadhoc || false,
    maxWords: item?.attributes.maxWords || DEFAULT_FIELD_MAX_WORDS,
    options: item?.attributes.options,
  },
}));

export const tranformedMonthlyFeaturesForValidation = (features, target) => features?.map(item => ({
  feature: item.feature,
  basic: item?.basic || '',
  standard: item?.standard || '',
  premium: item?.premium || '',
  is_required: item?.is_required || false,
  isCustomField: item?.isCustomField || false,
  attributes: {
    index: item.attributes.index,
    type: item?.attributes.type || '',
    placeholder: item?.attributes.placeholder || '',
    isthreetier: !item.attributes.isadhoc ? target : item.attributes.isthreetier,
    profile: item?.attributes?.profile,
    subcategoryid: item?.attributes?.subcategoryid,
    gig: item?.attributes?.gig,
    title: item?.attributes.title || '',
    isRequired: item?.attributes.isRequired || false,
    wordsCounter: item?.attributes.wordsCounter || false,
    isadhoc: item.attributes.isadhoc || false,
    maxWords: item?.attributes.maxWords || DEFAULT_FIELD_MAX_WORDS,
    options: item?.attributes.options,
  },
}));

export const transformMonthlyInitailValues = features => features?.map((item, index) => ({
  feature: item.feature,
  basic: item?.basic || '',
  standard: item?.standard || '',
  premium: item?.premium || '',
  is_required: item?.is_required || false,
  isCustomField: item?.is_custom_field || false,
  attributes: {
    index,
    type: item?.field_type || '',
    placeholder: item?.placeholder || '',
    title: item?.field_name || '',
    profile: item?.attributes?.profile,
    subcategoryid: item?.attributes?.subcategoryid,
    gig: item?.attributes?.gig,
    isRequired: item?.is_required || false,
    wordsCounter: item?.has_word_limit || false,
    isadhoc: item.is_adhoc_feature || false,
    maxWords: item?.max_characters || DEFAULT_FIELD_MAX_WORDS,
    options: transformOptions(item.select_options || []),
  },
}));

// filters

export const filterGeneralFeatures = features => features?.filter(field => !field.isCustomField);

export const filterCustomFields = features => features?.filter(field => field.isCustomField);

export const filterAdhocFields = features => features?.filter(field => field?.is_adhoc_feature);

export const filterMonthlyFields = features => features?.filter(field => !field?.is_adhoc_feature);

// add custom field

export const generatePricingCustomField = (
  title,
  isadhoc,
  subcategoryid,
  profileId,
  gigId,
  features,
  isThreeTierChecked,
  isCustomField = true,
  isRequired = false,
  type = 'text'
) => ({
  basic: '',
  standard: '',
  premium: '',
  is_required: isRequired,
  isCustomField,
  feature: uuidv4(),
  attributes: {
    type,
    subcategoryid,
    profile: profileId,
    isthreetier: isadhoc ? isThreeTierChecked.adhoc : isThreeTierChecked.monthly,
    gig: gigId,
    title,
    isRequired,
    index: features.length,
    wordsCounter: true,
    maxWords: DEFAULT_CUSTOMFIELD_CHAR_LIMIT,
    isadhoc,
  },
});

// Validations
export const checkLimitOfCustomFields = features => {
  const filteredFeatures = features.filter(item => item?.isCustomField);
  const isAdhocFeatureLimit = filteredFeatures.filter(item => item?.attributes.isadhoc).length > 1;
  const isMonthlyFeatures = filteredFeatures.filter(item => !item?.attributes.isadhoc).length > 1;
  return {
    adhoc: isAdhocFeatureLimit,
    monthly: isMonthlyFeatures,
  };
};

export const isFeatureExist = (title, isadhoc, features) => {
  const filtereFeatures = features.filter(field => field.attributes.isadhoc === isadhoc);
  return filtereFeatures.some(field => title === field.attributes.title);
};

// Data Transform for payloads
function ThreeTierHandler(isthreetier, isStandardValueExist, standardValue) {
  if (isthreetier) return isStandardValueExist ? standardValue : null;
  return null;
}

export const transformGeneralFeaturesPayload = generalFeatures => generalFeatures?.map(field => ({
  feature: field?.feature,
  basic: field.basic ? field.basic.toString() : null,
  standard: ThreeTierHandler(field.attributes.isthreetier, field.standard, field.standard.toString()),
  premium: ThreeTierHandler(field.attributes.isthreetier, field.premium, field.premium.toString()),
}));

export const transformCustomFeaturesPayload = customFeatures => customFeatures?.map(field => ({
  basic: field.basic ? field.basic.toString() : null,
  standard: ThreeTierHandler(field.attributes.isthreetier, field.standard, field.standard.toString()),
  premium: ThreeTierHandler(field.attributes.isthreetier, field.premium, field.premium.toString()),
  is_custom: {
    profile: field.attributes.profile,
    gig: field.attributes.gig,
    subcategory: field.attributes.subcategoryid,
    field_name: field.attributes.title,
    field_type: field.attributes.type,
    is_adhoc_feature: field.attributes.isadhoc,
    is_custom_field: true,
  },
}));

// gallery Tab
export const transformGalleryImages = images => images?.map(item => ({
  id: uuidv4(),
  image: item.image,
}));

export const imageFileSizeIntoMbs = file => file.size / (1024 * 1024);
