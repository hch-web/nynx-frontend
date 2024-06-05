// assets
import TimerIcon from 'assets/timerIcon.svg';

import { IN_PROGRESS, IN_REVISION, COMPLETED } from 'utilities/constants';
import {
  RED,
  DARK_GREY,
  GREEN,
  DARK_RED,
  CONTRAST_RED,
  CONSTRAST_DARK_GREY,
  CONTRAST_DARK_RED,
  CONTRAST_GREEN,
} from './constants';

export const conditionalTextColor = status => {
  switch (status) {
    case IN_PROGRESS:
      return GREEN;
    case IN_REVISION:
      return RED;
    case COMPLETED:
      return DARK_GREY;
    default:
      return DARK_RED;
  }
};

export const conditionalButtonBackgroundColor = status => {
  switch (status) {
    case IN_PROGRESS:
      return CONTRAST_GREEN;
    case IN_REVISION:
      return CONTRAST_RED;
    case COMPLETED:
      return CONSTRAST_DARK_GREY;
    default:
      return CONTRAST_DARK_RED;
  }
};

export const conditionalStatusText = status => {
  switch (status) {
    case IN_PROGRESS:
      return 'In Progress';
    case IN_REVISION:
      return 'In Revision';
    case COMPLETED:
      return 'Completed';
    default:
      return 'Canceled';
  }
};

export const conditionalIcon = status => {
  if (status === IN_PROGRESS || status === IN_REVISION) {
    return TimerIcon;
  }
  return undefined;
};
