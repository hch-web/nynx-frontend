export const proposalCount = count => {
  if (count < 5) return 'Less than 5';
  if (count < 10) return 'Less than 10';
  if (count < 15) return 'Less than 15';
  return 'More than 15';
};

export const isFilterExist = (filters, filter) => filters?.some(element => element?.type === filter?.type);

export const replaceSameTypeFilter = (filters, filter) => {
  const filterData = filters;
  const target = filterData?.find(element => element?.type === filter?.type);
  const previousFilterIndex = filterData?.indexOf(target);
  filterData[previousFilterIndex] = filter;
  return filterData;
};

export const transformJobFiltersToSelectOptions = (data, type) => data?.map(item => ({
  label: item.name,
  value: item.id,
  type
}));
