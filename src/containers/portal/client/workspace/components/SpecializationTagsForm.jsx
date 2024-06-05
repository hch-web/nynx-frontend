import React from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import propTypes from 'prop-types';
import { v4 } from 'uuid';

// COMPONENTS
import FormikField from 'shared/components/form/FormikField';

function SpecializationTagsForm({ name }) {
  const { values: formValues, setFieldValue: setFormValues, errors, touched } = useFormikContext();

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={(values, { resetForm }) => {
        if (values.name !== '') {
          const tags = [...formValues[name], { name: values.name, id: v4() }];
          setFormValues(name, tags);
        }
        resetForm();
      }}
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSubmit();
            }
          }}
        >
          <FormikField name="name" fullWidth />

          {errors.specializations && touched.specializations && (
            <div className="text-danger field-error">{errors.specializations}</div>
          )}
        </Form>
      )}
    </Formik>
  );
}

SpecializationTagsForm.propTypes = {
  name: propTypes.string.isRequired,
};

export default SpecializationTagsForm;
