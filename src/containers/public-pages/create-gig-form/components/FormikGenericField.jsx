/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import FormikField from 'shared/components/form/FormikField';
import FormikSelectField from 'shared/components/form/FormikSelectField';
import FormikCheckBox from 'shared/components/form/FormikCheckBox';
import {
  TEXT_FIELD,
  TEXT_AREA_FIELD,
  NUMBER_FIELD,
  PRICE_FIELD,
  SELECT_FIELD,
  CHECKBOX_FIELD,
  DEADLINE_SELECT_FIELD,
} from 'utilities/constants';

const textFieldTypes = [TEXT_FIELD, TEXT_AREA_FIELD, NUMBER_FIELD, PRICE_FIELD];
const selectedFieldTypes = [SELECT_FIELD, DEADLINE_SELECT_FIELD];
const checkBoxFieldTypes = [CHECKBOX_FIELD];

function FormikGenericField({ fieldType, fieldAttributes }) {
  const isTextField = textFieldTypes.includes(fieldType);
  const isSelectField = selectedFieldTypes.includes(fieldType);
  const isCheckBoxField = checkBoxFieldTypes.includes(fieldType);

  const { isRequired, options, wordsCounter, maxWords, isadhoc, isthreetier, ...restFieldAttributes } = fieldAttributes;

  return (
    <div>
      {isTextField && (
        <FormikField
          {...restFieldAttributes}
          type={fieldType}
          wordsCounter={wordsCounter}
          maxWords={maxWords}
          fullWidth
        />
      )}
      {isSelectField && (
        <FormikSelectField {...restFieldAttributes} options={options || []} fullWidth maxMenuHeight={120} />
      )}
      {isCheckBoxField && <FormikCheckBox {...restFieldAttributes} type={fieldType} />}
    </div>
  );
}

FormikGenericField.propTypes = {
  fieldType: PropTypes.string.isRequired,
  fieldAttributes: PropTypes.object,
};

FormikGenericField.defaultProps = {
  fieldAttributes: {},
};

export default FormikGenericField;
