import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import propTypes from 'prop-types';
import { KeyboardArrowDown } from '@mui/icons-material';

function JobPostAccordion({ children, title, defaultExpanded }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  return (
    <Box className="bg-white" sx={{ borderRadius: '10px' }}>
      <Accordion defaultExpanded={defaultExpanded} disableGutters className="mb-2">
        <AccordionSummary className="px-4 py-1" expandIcon={<KeyboardArrowDown />}>
          <Typography variant="h6" color={darkPurple} className="fw-600">
            {title}
          </Typography>
        </AccordionSummary>

        <Divider />

        <AccordionDetails className="px-0 pb-0">{children}</AccordionDetails>
      </Accordion>
    </Box>
  );
}

JobPostAccordion.propTypes = {
  children: propTypes.array.isRequired,
  title: propTypes.string,
  defaultExpanded: propTypes.bool,
};

JobPostAccordion.defaultProps = {
  title: '',
  defaultExpanded: false,
};

export default JobPostAccordion;
