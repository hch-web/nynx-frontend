import { REJECTED, PENDING } from 'utilities/constants';
import {
  RED,
  GREEN,
  CONTRAST_RED,
  CONTRAST_GREEN,
} from './constants';

export const taskConditionalButtonBackgroundColor = status => {
  switch (status) {
    case PENDING:
      return CONTRAST_GREEN;
    case REJECTED:
      return CONTRAST_RED;
    default:
      return CONTRAST_GREEN;
  }
};

export const taskConditionalTextColor = status => {
  switch (status) {
    case PENDING:
      return GREEN;
    case REJECTED:
      return RED;
    default:
      return GREEN;
  }
};

export const taskConditionalStatusText = status => {
  switch (status) {
    case PENDING:
      return 'Pending';
    case REJECTED:
      return 'Rejected';
    default:
      return 'Pending';
  }
};
