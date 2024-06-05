import React, { useContext } from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import propTypes from 'prop-types';
import { useFormikContext } from 'formik';

// styles
import { fieldWidthStyles } from 'styles/mui/components/create-gig-styles';

// common
import Label from '../common/Label';
import FormikGenericField from './FormikGenericField';

// context
import { PricingFormContext } from '../context/PricingContext';

// utilities
import { toggleAdhocFeaturesField } from '../utilities/helpers';

function PricingFormFields({ isAdhoc }) {
  const { isThreeTierChecked, handleDeleteCustomField } = useContext(PricingFormContext);

  const { values } = useFormikContext();

  // constant
  const tierType = isAdhoc ? 'adhoc' : 'monthly';

  return (
    <div>
      {toggleAdhocFeaturesField(values?.features, isAdhoc)?.map(field => {
        const fieldType = field?.attributes?.type;
        const fieldLabel = field?.attributes?.title;
        const fieldAttributes = field?.attributes;
        const isRequired = field?.attributes?.isRequired;
        const labelClassName = isRequired ? 'required' : '';
        return (
          <Box className="single-row d-flex py-2" key={field?.feature}>
            <Box className="col-2 col-sm-2 col-md-3 item">
              <Box className="d-flex align-items-center">
                <Label className={labelClassName}>{fieldLabel}</Label>
                {field.isCustomField && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteCustomField(field?.attributes?.index)}
                  >
                    <DeleteIcon sx={{ fontSize: '17px' }} />
                  </IconButton>
                )}
              </Box>
            </Box>

            <Box className="col col-sm-10 col-md-9 item d-flex align-items-center justify-content-between">
              <Box className="mx-2 text-center" sx={fieldWidthStyles}>
                {/* basic */}
                <FormikGenericField
                  fieldType={fieldType}
                  fieldAttributes={{
                    name: `features[${field.attributes.index}].basic`,
                    ...fieldAttributes,
                  }}
                />
              </Box>

              {isThreeTierChecked[tierType] && (
                <>
                  <Box className="mx-2 text-center" sx={fieldWidthStyles}>
                    {/* standard */}
                    <FormikGenericField
                      fieldType={fieldType}
                      fieldAttributes={{
                        name: `features[${field.attributes.index}].standard`,
                        ...fieldAttributes,
                      }}
                    />
                  </Box>

                  <Box className="mx-2 text-center" sx={fieldWidthStyles}>
                    {/* premium */}
                    <FormikGenericField
                      fieldType={fieldType}
                      fieldAttributes={{
                        name: `features[${field.attributes.index}].premium`,
                        ...fieldAttributes,
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        );
      })}
    </div>
  );
}

PricingFormFields.propTypes = {
  isAdhoc: propTypes.bool,
};

PricingFormFields.defaultProps = {
  isAdhoc: false,
};
export default PricingFormFields;
