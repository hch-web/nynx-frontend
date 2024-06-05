/* eslint-disable no-nested-ternary */
import React from 'react';
import { useTheme } from '@mui/material';
import Select from 'react-select';
import propTypes from 'prop-types';

// styles
import '../../../styles/components/select-field.scss';
import { activePlaceholderStyles, disablePlaceholderStyles } from 'styles/mui/components/react-select-styles';

function SelectField({
  options,
  placeholder,
  classNames,
  control,
  onChange,
  disable,
  isOptionListBorderBottom,
  value,
}) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const paleOrange = colors.paleOrange.main;
  const yellow = colors.yellow.main;
  const darkBlue = colors.darkBlue.main;
  const red = colors.red.main;
  const grey = colors.grey.main;

  const placeholderStyles = disable ? disablePlaceholderStyles : activePlaceholderStyles;

  const selectValue = Object.keys(value).length === 0 ? placeholder : value;
  return (
    <Select
      className={`formik-select-container ${classNames} p-0`}
      classNamePrefix="formik-select-container"
      onChange={onChange}
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
          borderBottom: isOptionListBorderBottom ? '1px solid #ece9eb' : '',
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          ':active': {
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
          color: disable ? red : darkPurple,
          fontFamily: 'Poppins, sans-serif',
          padding: '0px'
        }),
        control: base => ({
          ...base,
          ...control,
        }),
      }}
      placeholder={<div style={placeholderStyles}>{placeholder}</div> || ''}
      options={options}
      isSearchable={false}
      isDisabled={disable}
      value={selectValue}
    />
  );
}

SelectField.propTypes = {
  onChange: propTypes.func,
  options: propTypes.array.isRequired,
  value: propTypes.object,
  placeholder: propTypes.string,
  isOptionListBorderBottom: propTypes.bool,
  disable: propTypes.bool,
  classNames: propTypes.string,
  control: propTypes.object,
};

SelectField.defaultProps = {
  onChange: propTypes.func,
  disable: false,
  value: {},
  isOptionListBorderBottom: false,
  placeholder: '',
  classNames: '',
  control: {},
};

export default SelectField;
