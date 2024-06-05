import moment from 'moment';
import { APPROVED, COMPLETED, IN_PROGRESS, IN_REVISION } from 'utilities/constants';

export const transformDataToSelectOptions = data => data?.map(item => ({
  label: item.name,
  value: item.id,
}));

export const formatDate = date => moment(date).format('DD MMM, YYYY');

export const checkTimeDifference = (deadlineTime, createdTime) => {
  const deliverydeadlineTime = moment(deadlineTime);
  const completedTime = moment(createdTime);
  const timeDifference = deliverydeadlineTime.diff(completedTime, 'milliseconds');
  return timeDifference;
};

export const formatTime = time => moment(time).format('HH:mm');

export const formatStatus = status => {
  if (status === IN_PROGRESS) return 'In Progress';
  if (status === COMPLETED) return 'Completed';
  if (status === IN_REVISION) return 'In Revision';

  return status;
};

export const allSkillsAreDeactivated = (skills = []) => skills.every(skill => skill.is_closed);

export const isExistAnyApprovedRefundRequest = (refunds = []) => refunds?.some(refund => refund.status === APPROVED);
