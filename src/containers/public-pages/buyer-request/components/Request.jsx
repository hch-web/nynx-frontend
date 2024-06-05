import React from 'react';
import { Box, Typography } from '@mui/material';
import propTypes from 'prop-types';

// styles
import {
  buyerRequestContainerStyles,
  requestDescriptionStyles,
} from 'styles/mui/public-pages/buyer-request/buyer-request-styles';

// COMPONENTS
import Skill from 'containers/public-pages/common/components/Skill';

function Request({ request, setSelectedRequestId, setTaskId }) {
  const handleSetJob = () => {
    setSelectedRequestId(request?.id);
  };

  return (
    <Box className="row">
      <Box className="col-lg-12">
        <Box
          className="p-3 mt-3"
          sx={buyerRequestContainerStyles}
          // onClick={() => setSelectedRequestId(request?.id)}
        >
          <Typography variant="dashboardh6" className="weight-700">
            {request?.title}
          </Typography>

          <Typography
            variant="caption"
            className="d-block mt-2 responsive-text"
            sx={requestDescriptionStyles}
          >
            {request?.description}
          </Typography>

          {request?.job_skills?.map(skill => (
            <Skill
              skill={skill}
              key={skill?.id}
              isOfferSkill
              setTaskId={setTaskId}
              handleSetJob={handleSetJob}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

Request.propTypes = {
  request: propTypes.object,
  setSelectedRequestId: propTypes.func,
  setTaskId: propTypes.func.isRequired,
};

Request.defaultProps = {
  request: {},
  setSelectedRequestId: () => {},
};

export default Request;
