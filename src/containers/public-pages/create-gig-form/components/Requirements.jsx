/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FieldArray } from 'formik';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import RequirementForm from '../common/RequirementForm';

const Accordion = styled(props => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  })
);

const AccordionSummary = styled(props => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function Requirements() {
  return (
    <FieldArray name="requirements">
      {({ form, remove }) => {
        const requirements = form?.values?.requirements;
        return (
          <div>
            {requirements.map((item, index) => (
              <Accordion className="my-2" key={item.id}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography className="weight-500">{item.requirement}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <RequirementForm
                    defaultValue={requirements[index].requirement}
                    onDelete={() => remove(index)}
                    onSubmit={value => form.setFieldValue(`requirements[${index}].requirement`, value)}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        );
      }}
    </FieldArray>
  );
}

export default Requirements;
