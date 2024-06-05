import React from 'react';
import propTypes from 'prop-types';
import { Box, Typography, useTheme } from '@mui/material';
import { useField } from 'formik';

// common
import FormikMutlipleCheckBox from 'shared/components/form/FormikMutlipleCheckBox';
import { checkAttributeLimit, findSameTypeAttributes } from 'shared/helpers/utility-functions';

function Attributes({ attribute, name }) {
  const [field] = useField(name || '');
  const { value } = field;

  const theme = useTheme();
  const colors = theme.palette;
  const lightGrey = colors.grey.dark;

  // constants
  const attributesShouldDisable = checkAttributeLimit(value, attribute?.id, attribute?.number_of_attributes);
  const selectedAttributesCount = findSameTypeAttributes(value, attribute?.id);
  return (
    <Box className="col-md-6">
      <Box className="d-flex algin-items-center gap-3">
        <Typography variant="body1" className="weight-500">
          {attribute?.name}
        </Typography>
        <Typography variant="body2" color={lightGrey}>
          {selectedAttributesCount}/{attribute?.number_of_attributes}
        </Typography>
      </Box>{' '}
      <Box className="row">
        {attribute?.attribute_values?.map(element => (
          <Box className="col-md-6" key={element.id}>
            <FormikMutlipleCheckBox
              name="gig_attribute"
              label={element?.name}
              attribute={element}
              attributeType={attribute?.id}
              isDisabled={attributesShouldDisable}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

Attributes.propTypes = {
  attribute: propTypes.object,
  name: propTypes.string,
};

Attributes.defaultProps = {
  attribute: {},
  name: '',
};

export default Attributes;
