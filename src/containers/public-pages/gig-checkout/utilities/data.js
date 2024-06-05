import { PAYPAL } from 'utilities/constants';
import { v4 } from 'uuid';

export const checkoutRequirementsListing = [
  {
    id: v4(),
    question: 'Requirement will show here!',
  },
  {
    id: v4(),
    question: 'Requirement will show here!',
  },
];

export const starterTierBoxData = [
  {
    id: v4(),
    label: 'Delivery Time',
    value: 3,
    type: 'value',
    disabled: false,
  },
  {
    id: v4(),
    label: 'Number of Revisions',
    value: true,
    type: 'checkbox',
    disabled: false,
  },
  {
    id: v4(),
    label: 'Number of Initial Concepts',
    value: false,
    type: 'checkbox',
    disabled: true,
  },
];

export const paymentMethodLists = [
  {
    id: v4(),
    method: PAYPAL,
    title: 'Paypal',
    img: true,
  },
];
