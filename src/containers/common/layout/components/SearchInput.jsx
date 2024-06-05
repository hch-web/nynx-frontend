import React, { useState, useCallback, useEffect, useRef } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

// ASSETS & STYLES & COMPONENTS & UTILITIES
import lightSearchIcon from 'assets/searchIcon.svg';
import darkSearchIcon from 'assets/darkIcon.png';
import styles from 'styles/public-pages/layout/navbar.module.scss';
import { GIGS, GIG_SEARCH_TEXT, JOBS, JOB_SEARCH_TEXT } from 'utilities/constants';
import SearchMenu from './SearchMenu';

function SearchInput({ whyPage, howItWorks }) {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  // Login user state
  const { userInfo, isAuthenticated } = useSelector(state => state.auth);
  const isBuyer = userInfo?.is_buyer;

  const [searchText, setSearchText] = useState('');
  const [searchListMenu, setSearchListMenu] = useState(null);
  const [searchSelectedType, setSearchSelectedType] = useState(null);

  const handleOpenSearchMenu = e => {
    setSearchListMenu(e.currentTarget);
  };

  const handleCloseSearchMenu = () => {
    setSearchListMenu(null);
  };

  const handleChange = useCallback(event => {
    setSearchText(event.target.value);
  }, []);

  const handleKeyDown = useCallback((event, selectedType) => {
    setSearchText(event.target.value);
    if (event.target.value !== '') {
      if (event.key === 'Enter') {
        if (selectedType === JOBS) {
          navigate('/freelancer/buyer-request', {
            state: {
              searchState: { searchText: event.target.value },
            },
          });
        }

        if (selectedType === GIGS) {
          navigate(`/services/gigs?search=${event.target.value}`);
          setSearchText('');
        }

        setSearchText('');
      }
    }
  }, []);

  useEffect(() => {
    const isBuyerAndAuthenticated = isBuyer && isAuthenticated;
    const userLoggedInBasedInitialState = isBuyerAndAuthenticated ? GIGS : JOBS;
    const userSearchTypeInitialState = !isAuthenticated ? GIGS : userLoggedInBasedInitialState;
    setSearchSelectedType(userSearchTypeInitialState);
  }, [userInfo]);

  // constants
  const placeHolderText = searchSelectedType === GIGS ? GIG_SEARCH_TEXT : JOB_SEARCH_TEXT;

  return (
    <div className={`${styles.searchFieldBox} d-none d-sm-none d-md-none d-lg-block `} id="search-input">
      <Box
        className={`${howItWorks || whyPage ? styles.searchIconDark : styles.searchIconLight} ${
          styles.inputSearchIcon
        } d-flex justify-content-center align-items-center`}
        ref={searchInputRef}
        onClick={handleOpenSearchMenu}
      >
        <img
          src={howItWorks || whyPage ? darkSearchIcon : lightSearchIcon}
          alt="search-icon"
          className={`${howItWorks || whyPage ? `${styles.darkSearchIcon}` : `${styles.lightSearchIcon}`}`}
        />
        {!isAuthenticated && <KeyboardArrowDown sx={{ fontSize: 15 }} />}
      </Box>

      <input
        value={searchText}
        placeholder={placeHolderText}
        onChange={handleChange}
        onKeyDown={event => handleKeyDown(event, searchSelectedType)}
        type="text"
        className={` ${styles.customSearchField} ${
          howItWorks || whyPage ? `${styles.customSearchFieldDark}` : `${styles.customSearchFieldLight}`
        }`}
      />

      <SearchMenu
        anchorEl={searchListMenu}
        handleClose={handleCloseSearchMenu}
        setSearchSelectedType={setSearchSelectedType}
        searchSelectedType={searchSelectedType}
      />
    </div>
  );
}

SearchInput.propTypes = {
  howItWorks: propTypes.bool,
  whyPage: propTypes.bool,
};

SearchInput.defaultProps = {
  howItWorks: false,
  whyPage: false,
};

export default SearchInput;
