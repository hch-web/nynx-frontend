import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import propTypes from 'prop-types';

// styles
import { chipStyles, taskContainerStyles } from 'styles/mui/public-pages/buyer-request/buyer-request-styles';

// Utilities
import { formatTimeline } from 'utilities/helpers';
import { MONTHLY_BASED, MONTHLY, FIXED } from 'utilities/constants';

function Skill({ skill, isOfferSkill, setTaskId, handleSetJob }) {
  const budgetType = skill?.budget_type === MONTHLY_BASED ? MONTHLY : FIXED;
  const isOfferSend = (isOfferSkill && skill?.is_offer_sent) || skill?.is_closed;

  // Constants
  const totalHired = skill?.total_hired;
  const totalProposal = skill?.total_proposal;

  return (
    <Box className="my-4">
      <Box
        key={skill?.id}
        className={`d-flex flex-wrap p-2 w-100 ${isOfferSend && 'bg-light'} ${
          !isOfferSend && 'pointer'
        }`}
        sx={taskContainerStyles}
        onClick={
          !isOfferSend
            ? () => {
              setTaskId(skill?.id);
              handleSetJob();
            }
            : undefined
        }
      >
        <Box className="col-6">
          <Typography variant="dashboardh3" className="weight-700 d-block">
            I need an expert of {skill?.subcategory_label}
          </Typography>

          {skill?.specializations?.map(item => (
            <Chip key={item.id} label={item.name} variant="outlined" className="me-2" sx={chipStyles} />
          ))}
        </Box>

        <Box className="col-3">
          <Typography variant="caption" className="weight-600">
            $ {skill?.budget_amount}
          </Typography>

          <Typography variant="caption" className="d-block">
            {budgetType}
          </Typography>
        </Box>

        <Box className="col-3">
          <Typography variant="caption" className="weight-600">
            {formatTimeline(skill?.timeline, skill?.budget_type)}
          </Typography>

          <Typography variant="caption" className="d-block">
            Time
          </Typography>
        </Box>
      </Box>

      {isOfferSkill && (
        <Box className="d-flex align-items-center justify-content-between">
          <Typography variant="caption" className="d-block">
            Proposals: <span className="weight-500">{totalProposal}</span>
          </Typography>
          <Typography variant="caption" className="d-block">
            Total Hired: <span className="weight-500">{totalHired}</span>
          </Typography>
        </Box>
      )}
    </Box>
  );
}

Skill.propTypes = {
  skill: propTypes.object.isRequired,
  isOfferSkill: propTypes.bool,
  setTaskId: propTypes.func,
  handleSetJob: propTypes.func,
};

Skill.defaultProps = {
  handleSetJob: () => {},
  setTaskId: () => {},
  isOfferSkill: false,
};

export default Skill;
