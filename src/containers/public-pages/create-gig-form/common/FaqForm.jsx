import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import propTypes from 'prop-types';

// styles
import styles from 'styles/public-pages/create-gig/requirement-tab.module.scss';

function Form({ defaultValue, onDelete, onSubmit }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleSubmit = () => {
    onSubmit(inputValue);
  };

  return (
    <>
      <input
        type="text"
        value={inputValue.question}
        className={styles.customTextField}
        onChange={event => setInputValue({ ...inputValue, question: event.target.value })}
      />
      <input
        type="text"
        value={inputValue.answer}
        className={styles.customTextField}
        onChange={event => setInputValue({ ...inputValue, answer: event.target.value })}
      />
      <Box className="d-flex justify-content-between mt-2">
        <Button className="me-2 rounded-pill px-3 py-2" onClick={onDelete}>
          Delete
        </Button>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className="px-3 py-1"
          onClick={handleSubmit}
        >
          Update
        </Button>
      </Box>
    </>
  );
}
Form.propTypes = {
  defaultValue: propTypes.object,
  onDelete: propTypes.func,
  onSubmit: propTypes.func,
};

Form.defaultProps = {
  defaultValue: { question: '', answer: '' },
  onDelete: () => {},
  onSubmit: () => {},
};

export default Form;
