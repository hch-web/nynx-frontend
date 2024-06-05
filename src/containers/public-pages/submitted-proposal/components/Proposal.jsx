import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

// styles
import {
  proposalBodyStyles,
  proposalGigImageStyles,
} from 'styles/mui/public-pages/submitted-proposal-styles/proposal-styles';
import { MONTHLY_BASED, FIXED, MONTHLY } from 'utilities/constants';
import {
  taskConditionalButtonBackgroundColor,
  taskConditionalStatusText,
  taskConditionalTextColor,
} from 'containers/public-pages/utilities/helper';

function Proposal({ proposal }) {
  const budgetType = proposal?.budget_type === MONTHLY_BASED ? FIXED : MONTHLY;
  return (
    <Box
      className="d-flex px-4 py-3 text-decoration-none"
      sx={proposalBodyStyles}
      component={Link}
      to={`/freelancer/submitted-Proposals/${proposal?.id}`}
    >
      <Box className="col-4">
        <Typography varaint="dashboardh6" className="weight-700">
          {proposal?.gig_title}
        </Typography>
      </Box>
      <Box className="col-3">
        <Box className="d-flex gap-1">
          <Box
            className="common-border"
            sx={{
              background: `url(${proposal?.gig_main_image}) center no-repeat`,
              ...proposalGigImageStyles,
            }}
          />
          <Typography varaint="caption" className="weight-700">
            {proposal?.gig_title}
          </Typography>
        </Box>
      </Box>
      <Box className="col-2">
        <Typography varaint="caption" className="weight-700">
          ${proposal?.rates}
        </Typography>
        <Typography varaint="caption">{budgetType}</Typography>
      </Box>
      <Box className="col-2">
        <Typography varaint="c aption" className="weight-700">
          {moment(proposal?.created_at).format('MMM Do YY')}
        </Typography>
        <Typography varaint="caption">{moment(proposal?.created_at, 'YYYY-MM-DD').fromNow()}</Typography>
      </Box>
      <Box className="col-1">
        <Button
          variant="contained"
          sx={{
            borderRadius: '5px',
            backgroundColor: taskConditionalButtonBackgroundColor(proposal?.status),
            color: taskConditionalTextColor(proposal?.status),
          }}
        >
          <Typography variant="body2" className="text-disabled text-capitalize">
            {taskConditionalStatusText(proposal?.status)}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

Proposal.propTypes = {
  proposal: propTypes.object,
};

Proposal.defaultProps = {
  proposal: {},
};

export default Proposal;
