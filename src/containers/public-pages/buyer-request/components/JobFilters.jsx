/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// services
import { useListCategoriesQuery, useLazyListSubCategoriesQuery } from 'services/private/gig/create/overView';

// common compnents
import SelectField from 'shared/components/form/SelectField';
import Chip from 'containers/common/components/Chip';

// utilities
import { CATEGORY, JOB, NEWEST, SORT, SUB_CATEGORY } from 'utilities/constants';
import { getSorting } from 'utilities/helpers';
import {
  isFilterExist,
  replaceSameTypeFilter,
  transformJobFiltersToSelectOptions,
} from '../utilities/helper';
import { createdTypeFilters, jobTypeFilters } from '../utilities/data';

// components
import MinMax from './MinMax';

function JobFilters({ setBuyerRequests }) {
  const [filters, setFilters] = useState([]);
  const [categoriesOptions, setCategoryOptions] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filterData, setFilterData] = useState({
    category: {},
    subcategory: {},
    job: {},
    sort: {},
  });

  const [searchParams, setSearchParams] = useSearchParams();

  // Search Params
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const job = searchParams.get('job');

  // Api hook
  const { data: categoryData } = useListCategoriesQuery();
  const [getSubCategoriesData] = useLazyListSubCategoriesQuery();

  const handleSetQueryParams = filter => {
    if (filter.type === CATEGORY) {
      const params = {
        subcategory: subcategory || '',
        category: filter?.value,
        job: job || '',
      };
      setSearchParams(params);
    } else if (filter.type === SUB_CATEGORY) {
      const params = {
        category: category || '',
        subcategory: filter?.value,
        job: job || '',
      };
      setSearchParams(params);
    } else if (filter.type === JOB) {
      const params = {
        category: category || '',
        subcategory: subcategory || '',
        job: filter?.value,
      };
      setSearchParams(params);
    } else if (filter.type === SORT) {
      const params = {
        category: category || '',
        subcategory: subcategory || '',
        job: job || '',
        sort: filter?.value,
      };
      setSearchParams(params);
    }
  };

  // update filterData state
  const handleUpdateFilterState = filter => {
    const filterType = filter?.type;
    filterData[filterType] = filter;
    setFilterData(() => ({ ...filterData }));
  };

  // update query params and filters array
  const handleSelectFilter = value => {
    if (!isFilterExist(filters, value)) {
      handleUpdateFilterState(value);
      handleSetQueryParams(value);
      setFilters([...filters, value]);
    } else {
      handleUpdateFilterState(value);
      handleSetQueryParams(value);
      setFilters(() => [...replaceSameTypeFilter(filters, value)]);
    }
  };

  const handleSortJobOffers = selectedFilter => {
    handleUpdateFilterState(selectedFilter);
    handleSetQueryParams(selectedFilter);
  };

  const handleCategoriesForSubCategories = selectedCategory => {
    const fetchSubCategories = async () => {
      const subCategoriesData = await getSubCategoriesData(selectedCategory?.value);

      const transformedSubCategoryOption = transformJobFiltersToSelectOptions(
        subCategoriesData?.data,
        SUB_CATEGORY
      );

      setSubCategories(transformedSubCategoryOption);
    };

    fetchSubCategories();
    handleSelectFilter(selectedCategory);
  };

  useEffect(() => {
    const transformedCategoryOptions = transformJobFiltersToSelectOptions(categoryData, CATEGORY);
    setCategoryOptions(transformedCategoryOptions);
  }, [categoryData]);

  const onChipDelete = filterToBeDelete => {
    const itemToBeDeleteType = filterToBeDelete?.type;
    const updatedFilters = filters.filter(element => element.value !== filterToBeDelete?.value);

    const params = {
      subcategory: subcategory || '',
      category: category || '',
      job: job || '',
    };

    if (filterToBeDelete?.type === CATEGORY) {
      setSubCategories([]);
      const subCategoryFilter = updatedFilters?.find(element => element.type === SUB_CATEGORY);
      if (subCategoryFilter) {
        const subCategoryIndex = updatedFilters?.indexOf(subCategoryFilter);
        updatedFilters.splice(subCategoryIndex, 1);
        delete params[SUB_CATEGORY];
        delete filterData[SUB_CATEGORY];
      }
    }

    delete params[itemToBeDeleteType];
    delete filterData[itemToBeDeleteType];

    setFilterData(filterData);
    setSearchParams(params);
    setFilters(updatedFilters);
  };

  const handleResetFilters = () => {
    setFilters([]);
    setSubCategories([]);
    setSearchParams({});
    setFilterData({});
  };

  return (
    <Box className="my-4 pb-2">
      <Box className="d-flex flex-wrap justify-content-start mb-2">
        {/* job type filters */}
        <SelectField
          classNames="me-2 my-1"
          name="sort"
          placeholder="Relevence"
          value={filterData?.sort}
          onChange={value => handleSortJobOffers(value)}
          options={createdTypeFilters || []}
        />

        {/* Categories Filters */}
        <SelectField
          classNames="me-2 my-1"
          name="categoriesOptions"
          placeholder="Categories"
          value={filterData?.category}
          onChange={value => handleCategoriesForSubCategories(value)}
          options={categoriesOptions || []}
        />

        {/* Sub Categories Filters */}
        <SelectField
          classNames="me-2 my-1"
          name="categoriesOptions"
          placeholder="Sub Categories"
          value={filterData?.subcategory}
          onChange={value => handleSelectFilter(value)}
          options={subCategories || []}
        />

        {/* job type filters */}
        <SelectField
          classNames="me-2 my-1"
          name="jobType"
          placeholder="Job Type"
          value={filterData?.job}
          onChange={value => handleSelectFilter(value)}
          options={jobTypeFilters || []}
        />

        {/* Min Max Filter */}
        <MinMax setFilters={setFilters} filters={filters} handleUpdateFilterState={handleUpdateFilterState} />

        <Button variant="contained" color="primary" onClick={handleResetFilters}>
          Reset
        </Button>
      </Box>

      <Box className="d-flex flex-wrap justify-content-start">
        {filters?.map(item => (
          <Chip key={item.value} title={item.label} item={item} close onClose={onChipDelete} />
        ))}
      </Box>
    </Box>
  );
}

JobFilters.propTypes = {
  setBuyerRequests: PropTypes.func.isRequired,
};

export default JobFilters;
