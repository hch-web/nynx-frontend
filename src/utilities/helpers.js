import moment from 'moment';

// IMAGES
import blankFile from 'assets/file_simple.svg';
import pdfFile from 'assets/file-pdf.svg';
import docFile from 'assets/file-doc.svg';
import cssFile from 'assets/file-css.svg';
import imgFile from 'assets/file-image.svg';
import sqlFile from 'assets/file-SQL.svg';
import excelFile from 'assets/excel.svg';
import aiFile from 'assets/file-AI.svg';
import visaCard from 'assets/visaCard.svg';
import masterCard from 'assets/masterCard.svg';
import paypal from 'assets/paypal-card-icon.svg';
import timerIcon from 'assets/timerIcon.svg';

// Level Badges
import newExpertIcon from 'assets/new_expert_badge.svg';
import noviceIcon from 'assets/novice_bage.svg';
import achieverIcon from 'assets/achiever_badge.svg';
import nynxChoiceIcon from 'assets/nynx_choice.svg';

// UTILITIES
import { colors } from 'styles/common/colors';
import {
  ACHIEVER,
  CANCELED,
  COMPLETED,
  DATE_FORMAT,
  IN_PROGRESS,
  IN_REVISION,
  MASTERCARD,
  MONTHLY_BASED,
  NEW_EXPERT,
  NOVICE,
  NYNX_PRO,
  PAYPAL,
  PROJECT_BASED,
  REJECTED,
  VISA,
} from './constants';

export const convertURLToImageFile = async url => {
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], `${fileName}`, {
    type: blob.type,
  });
  file.imgSrc = url;
  return {
    image: file,
  };
};

export const convertURLToFile = async url => {
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], `${fileName}`, {
    type: blob.type,
  });
  file.imgSrc = url;
  return file;
};

export const stringifyElement = e => {
  let event = e;

  if (event) {
    event = event.current ?? event;
    return `${String(event.tagName).toLowerCase()}#${event.id}.${event.className}`;
  }
  return null;
};

export const compareRef = (o1, o2) => {
  let target1 = o1;
  let target2 = o2;

  if (target1 && target2) {
    target1 = target1.current ?? target1;
    target2 = target2.current ?? target2;
    return stringifyElement(target1) === stringifyElement(target2);
  }
  return target1 === target2;
};

export const getSorting = (order, orderBy) => {
  if (order === 'asc') {
    return (a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return -1;
      }
      if (a[orderBy] > b[orderBy]) {
        return 1;
      }
      return 0;
    };
  }
  return (a, b) => {
    if (a[orderBy] > b[orderBy]) {
      return -1;
    }
    if (a[orderBy] < b[orderBy]) {
      return 1;
    }
    return 0;
  };
};

export const setIconByFileType = type => {
  if (type.includes('pdf')) return pdfFile;
  if (type.includes('css')) return cssFile;
  if (
    type.includes('image')
    || type.includes('png')
    || type.includes('jpg')
    || type.includes('jpeg')
    || type.includes('svg')
  ) {
    return imgFile;
  }
  if (type.includes('ai')) return aiFile;
  if (type.includes('sql')) return sqlFile;
  if (
    type.includes('xls')
    || type.includes('xlsx')
    || type.includes('csv')
    || type.includes('ms-excel')
    || type.includes('spreadsheet')
  ) {
    return excelFile;
  }
  if (type.includes('doc')) return docFile;

  return blankFile;
};

export const formatName = (firstName, lastName, userName) => (!!firstName && !!lastName ? `${firstName} ${lastName[0]}` : userName);

export const formatTimeline = (days, type) => {
  const toMonths = Math.floor((days % 365) / 30);
  const toDays = Math.floor((days % 365) % 30);

  if (type === PROJECT_BASED) {
    if (days > 30) {
      return `${toMonths} Months ${toDays} Days`;
    }

    return `${days} Days`;
  }

  return `${days} Months`;
};

export const formatEndDate = (
  date,
  type,
  status,
  completedTime,
  cancelledAt = moment().format('DD MMM, YYYY')
) => {
  const endDate = moment(date).format('DD MMM, YYYY');

  if (type === PROJECT_BASED && status === IN_PROGRESS) {
    const diffInDays = moment(date).diff(moment(), 'days');

    if (diffInDays <= 3) {
      return { label: 'Due in', value: `${diffInDays ?? 0} days`, timer: timerIcon || '' };
    }

    return { label: 'Ending on', value: endDate || '', timer: null };
  }

  if (type === MONTHLY_BASED && status === IN_PROGRESS) {
    const diffInMonths = moment(date).diff(moment(), 'months');

    if (diffInMonths <= 1) {
      return { label: 'Due in', value: `${diffInMonths ?? 0} Month`, timer: timerIcon };
    }

    return { label: 'Ending on', value: endDate, timer: null };
  }

  if (status === CANCELED && !!cancelledAt) {
    return { label: 'Ended', value: moment(cancelledAt).format('DD MMM, YYYY'), timer: null };
  }

  if (status === COMPLETED && !!completedTime) {
    return { label: 'Ended', value: moment(completedTime).format('D MMM, YYYY'), timer: null };
  }

  if (status === IN_REVISION) {
    return { label: 'In Revision', value: null, timer: null };
  }

  return null;
};

export const getQueryParams = (url = '', keys = []) => {
  const query = url && new URLSearchParams(`?${url.split('?')[1]}`);
  const result = {};

  if (query) {
    keys?.forEach(key => {
      result[key] = +query.get(key) || undefined;
    });
  }

  return result;
};

export const formatFileSize = (sizeInBytes = 0) => {
  const decimal = 1;
  const marker = 1024;

  const toKB = (+sizeInBytes / marker).toFixed(decimal);
  const toMB = (+sizeInBytes / (marker * marker)).toFixed(decimal);
  const toGB = (+sizeInBytes / (marker * marker * marker)).toFixed(decimal);

  if (toKB < marker) return `${toKB} kb`;
  if (toMB < marker) return `${toMB} mb`;
  if (toGB < marker) return `${toGB} gb`;

  return +sizeInBytes;
};

export const getFormatedTaskStatus = (status = '') => {
  const { success, muted, red } = colors;
  if (status === IN_PROGRESS) return { color: success, value: 'In Progress', variant: 'success' };
  if (status === COMPLETED) return { color: muted, value: 'Completed', variant: 'muted' };
  if (status === CANCELED) return { color: red, value: 'Cancelled', variant: 'danger' };
  if (status === IN_REVISION) return { color: red, value: 'In Revision', variant: 'inRevision' };

  return { value: status, color: muted, variant: 'muted' };
};

export const getCardImgFromBrand = name => {
  if (name === VISA) return visaCard;
  if (name === MASTERCARD) return masterCard;
  if (name === PAYPAL) return paypal;

  return '';
};

export const splitArrayIntoChunks = (inputArray, splitSize) => {
  const [list, chunkSize] = [inputArray, splitSize];
  return [...Array(Math.ceil(list.length / chunkSize))].map(() => list.splice(0, chunkSize));
};

export const getUniqueObjects = (targetObjectKey, arrayOfObjects = []) => [
  ...new Map(arrayOfObjects.map(item => [item[targetObjectKey], item])).values(),
];

export const sumArrayElement = (array, key) => array.reduce((accumulator, currentValue) => accumulator + +currentValue[key], 0);

export const convertMillisecondsToDuration = (timeInMilliSeconds = 0) => {
  const milliseconds = Math.abs(timeInMilliSeconds);
  let seconds = milliseconds / 1000;
  let minutes = Math.floor(seconds / 60);
  seconds = (seconds % 60).toFixed(0);
  let hours = Math.floor(minutes / 60);
  minutes %= 60;
  const days = Math.floor(hours / 24);
  hours %= 24;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export const conditionalBadgeOfExpert = level => {
  switch (level) {
    case NEW_EXPERT:
      return newExpertIcon;
    case NOVICE:
      return noviceIcon;
    case ACHIEVER:
      return achieverIcon;
    case NYNX_PRO:
      return nynxChoiceIcon;
    default:
      return null;
  }
};

export const formatStatus = status => {
  if (status === IN_PROGRESS) return 'In Progress';
  if (status === COMPLETED) return 'Completed';
  if (status === IN_REVISION) return 'In Revision';
  if (status === CANCELED) return 'Cancelled';
  return status;
};

export const conditionalStatusVariant = status => {
  if (status === IN_PROGRESS || status === COMPLETED) return 'success';
  if (status === IN_REVISION || status === REJECTED || status === CANCELED) return 'danger';
  return 'success';
};

export const isObjectEmpty = obj => Object.keys(obj).length === 0;

export const isUserOnline = (userId, onlineUsers = []) => onlineUsers?.find(item => item.profile === userId)?.online_status;

export const getLocaleDate = date => moment(date, DATE_FORMAT).toDate();

export const getLocaleChatDate = date => moment(date, 'YYYY-MM-DD HH:mm:ss').toDate();
