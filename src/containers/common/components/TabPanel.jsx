import React from 'react';
import { Box } from '@mui/material';
import propTypes from 'prop-types';

function TabPanel({ stateValue, index, children }) {
  return <Box>{stateValue === index && <Box>{children}</Box>}</Box>;
}

TabPanel.propTypes = {
  stateValue: propTypes.number.isRequired,
  index: propTypes.number.isRequired,
  children: propTypes.element.isRequired,
};

export default TabPanel;
