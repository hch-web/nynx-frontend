import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// services
import { useLazyListBuyerRequestsQuery } from 'services/private/buyerRequests';

// styles
import { sectionLoaderStyles } from 'styles/mui/components/section-loader-styles';

// utilities
import { DEFAULT_LIMIT, NEWEST } from 'utilities/constants';

// components
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { getSorting } from 'utilities/helpers';
import Request from './Request';
import Searchbar from './SearchBar';
import BuyerRequestModal from './BuyerRequestModal';
import JobFilters from './JobFilters';

function BuyerRequests() {
  const { isAuthenticated } = useSelector(state => state.auth);

  // route state
  const { state } = useLocation();
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const job = searchParams.get('job');
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const sort = searchParams.get('sort');

  const isCategoryParam = Boolean(category);
  const isSubCategoryParam = Boolean(subcategory);
  const isJobParam = Boolean(job);
  const isMinParam = Boolean(min);
  const isMaxParams = Boolean(max);
  const isSort = Boolean(sort);

  const searchStateText = state?.searchState?.searchText;

  const [listBuyerRequests, { data: buyerRequestsData, isLoading: buyerRequestLoading, isFetching }] = useLazyListBuyerRequestsQuery();
  const [buyerRequests, setBuyerRequests] = useState([]);
  const [searchText, setSearchText] = useState(searchStateText || '');
  const [selectRequestId, setSelectedRequestId] = useState(null);
  const [taskId, setTaskId] = useState(null);

  // constants
  const showLoadMoreButton = buyerRequests?.length < buyerRequestsData?.count;

  const loadBuyerRequests = () => {
    listBuyerRequests({
      offset: buyerRequests.length,
      limit: DEFAULT_LIMIT,
      search: searchText || '',
      category,
      subcategory,
      job,
      min,
      max,
    }).then(res => {
      const newBuyerRequests = res?.data?.results || [];
      if (sort === NEWEST) {
        const allBuyerRequest = [...buyerRequests, ...newBuyerRequests];
        const sortedBuyerRequest = [...allBuyerRequest].sort(getSorting('desc', 'created_at'));
        setBuyerRequests(sortedBuyerRequest);
      } else {
        setBuyerRequests([...buyerRequests, ...newBuyerRequests]);
      }
    });
  };

  const loadInitialBuyerRequestsByFilter = () => {
    listBuyerRequests({
      offset: 0,
      limit: DEFAULT_LIMIT,
      search: searchText || '',
      category,
      subcategory,
      job,
      min,
      max,
    }).then(res => {
      const responseRequest = res?.data?.results || [];
      if (sort === NEWEST) {
        setBuyerRequests(() => [...responseRequest].sort(getSorting('desc', 'created_at')));
      } else {
        setBuyerRequests(() => [...responseRequest]);
      }
    });
  };

  useEffect(() => {
    if (isCategoryParam || isSubCategoryParam || isJobParam || isMinParam || isMaxParams || isSort) {
      loadInitialBuyerRequestsByFilter();
    } else {
      loadInitialBuyerRequestsByFilter();
    }
  }, [searchParams]);

  const handleToggleModal = () => {
    setSelectedRequestId(null);
  };

  return buyerRequestLoading ? (
    <div style={sectionLoaderStyles}>
      <SectionLoader />
    </div>
  ) : (
    <div>
      <Box className="mb-3">
        <Searchbar
          placeholder="Search For a Job"
          searchBuyerRequest={listBuyerRequests}
          loading={isFetching}
          setSearchText={setSearchText}
          setBuyerRequests={setBuyerRequests}
          category={category}
          subcategory={subcategory}
          searchText={searchText}
          job={job}
        />
        <JobFilters setBuyerRequests={setBuyerRequests} />
      </Box>

      {buyerRequests?.length > 0 ? (
        <Box>
          <Typography variant="dashboardh2" className="weight-500">
            Jobs you might like
          </Typography>

          {buyerRequests?.map(element => (
            <Request key={element?.id} request={element} setTaskId={setTaskId} setSelectedRequestId={setSelectedRequestId} />
          ))}

          {showLoadMoreButton && (
            <Box className="d-flex justify-content-center align-items-center mt-3">
              <Button variant="outlined" size="large" onClick={loadBuyerRequests}>
                {isFetching ? <CircularProgress size={20} /> : 'Load More'}
              </Button>
            </Box>
          )}

          <BuyerRequestModal
            isOpen={Boolean(selectRequestId && isAuthenticated)}
            handleToggle={handleToggleModal}
            jobId={selectRequestId}
            taskId={taskId}
          />
        </Box>
      ) : (
        <Typography variant="dashboardh2" className="weight-500">
          No Searches Found!
        </Typography>
      )}
    </div>
  );
}

export default BuyerRequests;
