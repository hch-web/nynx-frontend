import { ADHOC, JOB, MONTHLY, MONTHLY_BASED, NEWEST, PROJECT_BASED, RELEVANCE, SORT } from 'utilities/constants';
import { v4 } from 'uuid';

export const jobTypeFilters = [
  {
    id: v4(),
    label: ADHOC,
    value: PROJECT_BASED,
    type: JOB,
  },
  {
    id: v4(),
    label: MONTHLY,
    value: MONTHLY_BASED,
    type: JOB,
  },
];

export const createdTypeFilters = [
  {
    id: v4(),
    label: NEWEST,
    value: 'newest',
    type: SORT,
  },
  {
    id: v4(),
    label: RELEVANCE,
    value: 'relevance',
    type: SORT,
  },
];
