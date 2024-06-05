import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useFormikContext } from 'formik';

// Common
import Chip from 'containers/common/components/Chip';

function SearchTags({ name }) {
  const { values, setFieldValue } = useFormikContext();

  const handleRemoveTag = tagLabel => {
    const newTags = [...values[name]].filter(item => item.id !== tagLabel.id);
    setFieldValue(name, newTags);
  };

  return (
    <Box className="d-flex align-items-start flex-wrap my-3">
      {values?.search_tags.map(item => (
        <Chip title={item.tag} item={item} key={Math.random()} close onClose={handleRemoveTag} />
      ))}
    </Box>
  );
}

SearchTags.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SearchTags;
