import { ADHOC, MONTHLY } from 'utilities/constants';

export const gigTypeOptions = [
  {
    value: ADHOC,
    label: 'Adhoc',
  },
  {
    value: MONTHLY,
    label: 'Monthly',
  },
];

export const adhocDeliveryOptions = [
  { value: '1', label: 'Express 24H' },
  { value: '3', label: 'Up to 3 days' },
  { value: '7', label: 'Up to 7 days' },
];

export const monthlyDeliveryOptions = [
  { value: '1', label: '1 month' },
  { value: '2', label: 'Up to 2 months' },
  { value: '3', label: 'Up to 3 months' },
];
