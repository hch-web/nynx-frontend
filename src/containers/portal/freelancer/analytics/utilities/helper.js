import { ACHIEVER, NEW_EXPERT, NOVICE, NYNX_PRO } from 'utilities/constants';
import moment from 'moment';

// Assets
import starBackgroundImg from 'assets/star-background.svg';

export const getPercentageValue = (obtained = 0, total = 0) => (obtained / total) * 100 || 0;

export const conditionalBackgroundColor = currentIndex => {
  switch (currentIndex) {
    case 0:
      return '#FAC751';
    case 1:
      return '#FEA87E';
    case 2:
      return '#A23842';
    default:
      return `url(${starBackgroundImg}) center no-repeat`;
  }
};

export const checkExpertLevelSteps = expertLevel => {
  switch (expertLevel) {
    case NEW_EXPERT:
      return 0;
    case NOVICE:
      return 1;
    case ACHIEVER:
      return 2;
    case NYNX_PRO:
      return 3;
    default:
      return 0;
  }
};

export const conditionalLabelColor = currentIndex => {
  switch (currentIndex) {
    case 0:
      return '#422438';
    default:
      return '#fff';
  }
};

export const getMonthListTillCurrentMonth = () => {
  const today = moment(); // get current date using moment.js
  const startOfYear = moment(today).startOf('year'); // get start of year
  const monthsList = []; // create empty array to hold month names

  const currentDate = moment(startOfYear); // set current date to start of year
  while (currentDate <= today) {
    // loop over each month up to current month
    monthsList.push({ label: currentDate.format('MMMM'), value: currentDate.month() + 1 }); // add month name to array
    currentDate.add(1, 'months'); // move to next month
  }
  return monthsList;
};
