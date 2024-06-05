import { ADHOC, MONTHLY } from './constants';

export const sellerLevelsOptions = [
  {
    label: 'New Expert',
    value: 'new_expert',
  },
  {
    label: 'Novice',
    value: 'novice',
  },
  {
    label: 'Achiever',
    value: 'achiever',
  },
  {
    label: 'Nynx Pro',
    value: 'nynx_pro',
  },
];

// export const gigTypeOptions = [
//   {
//     label: 'Monthly',
//     value: true,
//   },
//   {
//     label: 'Adhoc',
//     value: false,
//   },
// ];

export const gigTypeOptions = [
  {
    label: 'Monthly',
    value: MONTHLY,
  },
  {
    label: 'Adhoc',
    value: ADHOC,
  },
];
