import React, { useEffect, useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// API HOOKS
import { useLazyGetGigSearchListQuery } from 'services/public/gig/gigSearch';

// COMPONENTS
import { getSearchParamsObject } from 'utilities/utility-functions';
import GigFilters from './components/GigFilters';
import GigCards from './components/GigCards';
import { GigSearchContext } from './customHooks/useGetGigSearchContext';

function GigSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsObj = getSearchParamsObject(searchParams);
  const userId = useSelector(state => state?.auth?.userInfo?.id);

  // API HOOKS
  const [gigSearchHandler, { data: gigs, isLoading, isFetching }] = useLazyGetGigSearchListQuery();

  const getAsyncGigSearch = async () => {
    await gigSearchHandler({ ...searchParamsObj, id: userId });
  };

  useEffect(() => {
    getAsyncGigSearch();
  }, []);

  useEffect(() => {
    getAsyncGigSearch();
  }, [searchParams]);

  const gigSearchContextValue = useMemo(
    () => ({
      searchParams,
      handler: gigSearchHandler,
      searchParamsObj,
      setSearchParams,
    }),
    [searchParams, searchParamsObj]
  );

  return (
    <GigSearchContext.Provider value={gigSearchContextValue}>
      <Container variant="public">
        <Typography variant="h2">Results for {searchParamsObj?.search || 'Gigs'}</Typography>

        <GigFilters />

        <GigCards gigsData={gigs?.results} isLoading={isLoading || isFetching} />
      </Container>
    </GigSearchContext.Provider>
  );
}

export default GigSearch;
