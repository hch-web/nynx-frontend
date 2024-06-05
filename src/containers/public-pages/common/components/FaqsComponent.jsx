import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
import { Add } from '@mui/icons-material';
import PropTypes from 'prop-types';

function FaqsComponent({
  questionTypoVariant,
  answerTypoVariant,
  question,
  answer,
  questionColor,
  answerColor,
  questionClassName,
  answerClassName,
}) {
  const theme = useTheme();
  const colors = theme.palette;
  const red = colors.red.main;
  return (
    <Accordion disableGutters>
      <AccordionSummary
        expandIcon={<Add sx={{ color: red }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="ps-0"
      >
        <Typography variant={questionTypoVariant} color={questionColor} className={questionClassName}>
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="ps-0">
        <Typography variant={answerTypoVariant} color={answerColor} className={answerClassName}>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

FaqsComponent.propTypes = {
  questionTypoVariant: PropTypes.string,
  answerTypoVariant: PropTypes.string,
  question: PropTypes.string,
  answer: PropTypes.string,
  questionColor: PropTypes.string,
  answerColor: PropTypes.string,
  questionClassName: PropTypes.string,
  answerClassName: PropTypes.string,
};

FaqsComponent.defaultProps = {
  questionTypoVariant: 'body1',
  answerTypoVariant: 'body1',
  question: '',
  answer: '',
  questionColor: '',
  answerColor: '',
  questionClassName: '',
  answerClassName: '',
};

export default FaqsComponent;
