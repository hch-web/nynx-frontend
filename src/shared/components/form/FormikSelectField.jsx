/* eslint-disable no-nested-ternary */
import React, { useMemo, useCallback } from 'react';
import { useTheme, Box } from '@mui/material';
import Select from 'react-select';
import propTypes from 'prop-types';
import { useField } from 'formik';

//  styles
import '../../../styles/components/select-field.scss';

function FormikSelectField({
  onChange,
  options,
  placeholder,
  name,
  classNames,
  control,
  removeSelectOption,
  onBlur,
  maxMenuHeight,
}) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const paleOrange = colors.paleOrange.main;
  const yellow = colors.yellow.main;
  const darkBlue = colors.darkBlue.main;
  const red = colors.red.main;
  const grey = colors.grey.main;

  const [field, meta, helpers] = useField(name);
  const { value: selectedValue, name: selectedFieldName, onBlur: onFieldBlur } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const modifiedData = useMemo(
    () => (removeSelectOption ? [] : [{ label: 'Select', value: 0 }, ...options]),
    [options, selectedValue]
  );

  const selectedOption = useMemo(() => {
    if (selectedValue !== null && selectedValue !== undefined && selectedValue !== '') {
      if (removeSelectOption) {
        return options?.find(item => item.value === selectedValue);
      }

      return modifiedData.find(item => item.value === selectedValue);
    }

    return null;
  }, [selectedValue, modifiedData, removeSelectOption]);

  const handleSelectChange = useCallback(
    selectedOptionObject => {
      const newValue = selectedOptionObject.value;

      if (newValue) {
        setValue(newValue);
        if (onChange) onChange(newValue, name, selectedOptionObject);
      }
    },
    [selectedValue, onChange]
  );

  const handleBlur = useCallback(
    event => {
      onFieldBlur(event);
      if (onBlur) onBlur(event.value, name);
    },
    [selectedValue]
  );

  return (
    <>
      <Select
        className={`formik-select-container ${classNames}`}
        classNamePrefix="formik-select-container"
        onChange={handleSelectChange}
        value={selectedOption}
        maxMenuHeight={maxMenuHeight}
        onBlur={handleBlur}
        name={selectedFieldName}
        components={{ IndicatorSeparator: () => null }}
        styles={{
          dropdownIndicator: base => ({
            ...base,
            color: red,
          }),
          option: (provided, { data, isFocused, isSelected }) => ({
            ...provided,
            border: 'none',
            background: isSelected ? yellow : isFocused ? '#fff' : 'data.color',
            color: isSelected ? '#000' : data.color,
            textAlign: 'left',
            padding: '12px',
            fontFamily: 'Poppins, sans-serif',
            '&:active': {
              ...provided[':active'],
              backgroundColor: paleOrange,
              color: darkBlue,
            },
            '&:hover': {
              backgroundColor: grey,
            },
          }),
          singleValue: base => ({
            ...base,
            color: darkPurple,
            fontFamily: 'Poppins, sans-serif',
          }),
          control,
        }}
        placeholder={placeholder}
        options={options}
      />
      {error && touched && (
        <Box className="field-error text-danger" sx={{ textAlign: 'start' }}>
          {error}
        </Box>
      )}
    </>
  );
}

FormikSelectField.propTypes = {
  options: propTypes.array.isRequired,
  placeholder: propTypes.string,
  name: propTypes.string.isRequired,
  maxMenuHeight: propTypes.number,
  classNames: propTypes.string,
  control: propTypes.func,
  removeSelectOption: propTypes.bool,
  onChange: propTypes.func,
  onBlur: propTypes.func,
};

FormikSelectField.defaultProps = {
  placeholder: 'Select',
  classNames: '',
  maxMenuHeight: 150,
  control: base => ({ ...base }),
  removeSelectOption: false,
  onChange: () => {},
  onBlur: () => {},
};
export default FormikSelectField;
