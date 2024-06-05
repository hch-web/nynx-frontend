import { createContext, useContext } from 'react';

export const GigSearchContext = createContext({
  searchParams: '',
  setSearchParams: () => {},
  handler: async () => {},
  searchParamsObj: {},
});

export const useGetGigSearchContext = () => {
  const context = useContext(GigSearchContext);

  return context;
};
