import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

// Assets
import listBadge from 'assets/list-badge.png';

// Styles
import styles from 'styles/public-pages/howItWorks//how-it-works-clients.module.scss';
import { stepToBecomeClientStyles } from 'styles/mui/public-pages/how-it-works/for-client-styles';

// Components
import FaqsComponent from 'containers/public-pages/common/components/FaqsComponent';

function StepsToBecomeClient({ dir, image, title, description, stepCount, listItems, accordion, faqs }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  return (
    <Grid
      container
      className={`${styles.contentSectionGrid} pt-5 ${
        dir && dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'
      } `}
    >
      <Grid item xs={12} sm={12} md={6} className="ps-5 pt-3 d-none d-sm-none d-md-block">
        <Box
          sx={{
            background: `url(${image}) center no-repeat`,
            ...stepToBecomeClientStyles,
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        className="ps-5 pe-1 pt-3 d-flex align-items-center justify-content-start"
      >
        <Box className={`${styles.contentSectionItem}`}>
          <Typography color={darkPurple} variant="h1" className={styles.stepCountNum}>
            {stepCount}
          </Typography>
          <Typography color={darkPurple} variant="h3" className="mt-3">
            {title}
          </Typography>
          <Typography color={darkPurple} variant="h6" className="my-4">
            {description}
          </Typography>

          <Box>
            {listItems?.map(item => (
              <Box className="d-flex align-items-center mb-2" key={item?.id}>
                <img src={listBadge} className="me-3" alt="main" />
                <Typography color={darkPurple} variant="h6">
                  {item?.text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* ACCORDION */}
          {accordion && (
            <Box className="my-3">
              {faqs?.map(item => (
                <FaqsComponent
                  key={item?.id}
                  question={item?.question}
                  answer={item?.answer}
                  questionTypoVariant="h6"
                  answerTypoVariant="body1"
                  questionColor={darkPurple}
                  answerColor={darkPurple}
                  questionClassName="weight-500"
                />
              ))}
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

StepsToBecomeClient.propTypes = {
  dir: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  stepCount: PropTypes.number,
  listItems: PropTypes.array,
  accordion: PropTypes.bool,
  faqs: PropTypes.array,
};

StepsToBecomeClient.defaultProps = {
  dir: '',
  image: '',
  title: '',
  description: '',
  stepCount: 0,
  listItems: [],
  faqs: [],
  accordion: false,
};

export default StepsToBecomeClient;
