import React from 'react';
import PropTypes from 'prop-types';
import { zeroPad } from 'react-countdown';

// Components
import { convertMillisecondsToDuration } from 'utilities/helpers';
import CountDownTimerCardDesign from './CountDownTimerCardDesign';
import { checkTimeDifference } from '../utilities/helper-functions';

function CompletedTaskTime({ deliveryDate, completedDate }) {
  const deliveryTimeDifference = checkTimeDifference(deliveryDate, completedDate);

  const duration = convertMillisecondsToDuration(deliveryTimeDifference);

  return deliveryTimeDifference < 0 ? (
    <CountDownTimerCardDesign
      days={zeroPad(duration?.days)}
      hours={zeroPad(duration?.hours)}
      minutes={zeroPad(duration?.minutes)}
      seconds={zeroPad(duration?.seconds)}
      digitVaraint="overTimeTimer"
      isOvertime
    />
  ) : (
    <CountDownTimerCardDesign
      days={zeroPad(duration?.days)}
      hours={zeroPad(duration?.hours)}
      minutes={zeroPad(duration?.minutes)}
      seconds={zeroPad(duration?.seconds)}
      digitVaraint="countDownTimer"
    />
  );
}

CompletedTaskTime.propTypes = {
  deliveryDate: PropTypes.string.isRequired,
  completedDate: PropTypes.string.isRequired,
};
export default CompletedTaskTime;
