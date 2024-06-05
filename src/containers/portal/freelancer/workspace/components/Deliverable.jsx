import React from 'react';
import { Grid, Card, Typography } from '@mui/material';
import propTypes from 'prop-types';
import moment from 'moment';
import { saveAs } from 'file-saver';

// styles
import { fileIconStyles } from 'styles/mui/portal/deliverable-tab-styles';

// utilities
import { setIconByFileType } from 'utilities/helpers';

function Deliverable({ attachment }) {
  return (
    <Grid item xl={2.4} lg={4} md={4} sm={6} xs={12}>
      <Card
        onClick={() => saveAs(attachment?.file)}
        variant="outlined"
        className="py-4 px-3 d-flex flex-column justify-content-center align-items-center pointer"
      >
        <img src={setIconByFileType(attachment?.file_type || '')} alt="file-Icon" style={fileIconStyles} />

        <Typography variant="dashboardh6" className="weight-700 mt-3">
          {attachment?.file_name}
        </Typography>

        <Typography variant="dashboardBody" className="text-muted">
          {moment(attachment?.created_at).fromNow()}
        </Typography>
      </Card>
    </Grid>
  );
}

Deliverable.propTypes = {
  attachment: propTypes.object.isRequired,
};

export default Deliverable;
