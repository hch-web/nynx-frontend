import React, { useCallback, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';

// STYLES
import styles from 'styles/components/search-field.module.scss';

// IMAGES
import searchIcon from 'assets/search-icon.png';

function Searchbar({ placeholder, name, workspaceId, searchFreelancers, loading }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchFreelancers = async () => {
      await searchFreelancers({ workspaceId, searchValue: '' });
    };

    fetchFreelancers();
  }, []);

  const debouncedHandleChange = useDebouncedCallback(
    async e => {
      const body = { workspaceId, searchValue: e.target.value };
      await searchFreelancers(body);
    },
    [500]
  );

  const handleChange = useCallback(e => {
    setInputValue(e.target.value);

    debouncedHandleChange(e);
  });

  return (
    <Box className={styles.formGroup}>
      <img className={styles.searchIcon} src={searchIcon} alt="Search-Icon" />

      <input
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        type="search"
        className={styles.searchField}
      />

      {loading && <CircularProgress className={styles.loader} size={20} />}
    </Box>
  );
}

Searchbar.propTypes = {
  placeholder: propTypes.string,
  name: propTypes.string,
  workspaceId: propTypes.string,
  searchFreelancers: propTypes.func,
  loading: propTypes.bool,
};

Searchbar.defaultProps = {
  placeholder: '',
  name: '',
  workspaceId: '',
  searchFreelancers: () => {},
  loading: false,
};

export default Searchbar;
