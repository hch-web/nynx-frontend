/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FieldArray } from 'formik';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

// Components
import FaqForm from '../common/FaqForm';

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

export default function CustomizedAccordions() {
  return (
    <FieldArray name="faq">
      {({ form, remove }) => {
        const faq = form?.values?.faq;
        return (
          <div>
            {faq.map((element, index) => (
              <Accordion key={element.id} className="mt-2">
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography className="weight-500">{element.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FaqForm
                    defaultValue={faq[index]}
                    onDelete={() => remove(index)}
                    onSubmit={value => form.setFieldValue(`faq[${index}]`, value)}
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
