/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { Checkbox, FormControl, FormControlLabel, styled } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useField, useFormikContext } from 'formik';
import propTypes from 'prop-types';

// styles
import { iconStyles } from 'styles/mui/components/formik-checkbox-styles';

// utilities
import { isAttributeExistInValues, removeAttribute } from 'shared/helpers/utility-functions';

const BpIcon = styled('span')(() => iconStyles);

const CheckedIcon = styled(CheckBoxIcon)(({ theme }) => ({
  color: theme.palette.red.main,
  fontSize: '22px',
}));

function FormikCheckBox({ name, label, isDisabled, attributeType, attribute }) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name || '');
  const { value, ...restFieldProps } = field;

  const attributeData = {
    attribute_type: attributeType,
    attribute_value: attribute?.id,
  };

  const handleChange = useCallback(() => {
    if (isAttributeExistInValues(value, attributeData)) {
      setFieldValue(name, removeAttribute(value, attributeData));
    } else {
      setFieldValue(name, [...value, attributeData]);
    }
  }, [value, label]);

  const isChecked = isAttributeExistInValues(value, attributeData);

  return (
    <div className="d-flex flex-column align-items-start">
      <FormControl>
        <FormControlLabel
          control={(
            <Checkbox
              {...restFieldProps}
              checked={isChecked}
              color="default"
              onChange={handleChange}
              icon={<BpIcon />}
              checkedIcon={<CheckedIcon />}
              disableRipple
              inputProps={{ 'aria-label': 'Checkbox demo' }}
              sx={{
                '&:hover': { bgcolor: 'transparent' },
              }}
              disabled={!isChecked && isDisabled}
            />
          )}
          label={label}
        />
      </FormControl>
    </div>
  );
}

FormikCheckBox.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string,
  attribute: propTypes.object,
  isDisabled: propTypes.bool,
  attributeType: propTypes.number.isRequired,
};

FormikCheckBox.defaultProps = {
  label: '',
  attribute: {},
  isDisabled: false,
};

export default FormikCheckBox;
