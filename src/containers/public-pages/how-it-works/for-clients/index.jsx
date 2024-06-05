import React from 'react';
import { Grid, useTheme, Typography, Container, Box } from '@mui/material';

// Services
import {
  useHowItWorkForClientFirstStepQuery,
  useHowItWorkForClientSecondStepQuery,
  useHowItWorkForClientThirdStepQuery,
  useHowItWorksFrequentlyAskedQuestionsQuery,
} from 'services/public/how-it-works/forClients';

// Styles
import styles from 'styles/public-pages/howItWorks/how-it-works-clients.module.scss';

// Components
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';
import HeroSection from './components/HeroSections';
import PersonReview from '../../common/components/PersonReview';

// components
import StepsToBecomeClient from './components/StepsToBecomeClient';
import FaqContainer from '../../common/components/FaqContainer';

function BecomeAnExpertClient() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const { data: howItWorksFirstStepData, isLoading: howItWorksFirstStepDataLoading } = useHowItWorkForClientFirstStepQuery();
  const { data: howItWorkSecondStepData, isLoading: howItWorksSecondStepDataLoading } = useHowItWorkForClientSecondStepQuery();
  const { data: howItWorkThirdStepData, isLoading: howItWorksThirdStepDataLoading } = useHowItWorkForClientThirdStepQuery();
  const { data: howItWorksFrequentlyAskedQuestionData, isLoading: howItWorksFrequentlyAskedQuestionLoading } = useHowItWorksFrequentlyAskedQuestionsQuery();

  // step 1
  const howItWorksStep1Image = howItWorksFirstStepData?.image;
  const howItWorksMainHeading = howItWorksFirstStepData?.main_heading;
  const howItWorksStep1Heading = howItWorksFirstStepData?.sub_heading;
  const howItWorksStep1Description = howItWorksFirstStepData?.description;
  const howItWorksStep1Instructions = howItWorksFirstStepData?.built_points_for_create_workspace;
  const howItWorksStep1Faqs = howItWorksFirstStepData?.questions_and_answers_for_create_workspace;

  // step 2
  const howItWorkSecondStepImage = howItWorkSecondStepData?.image;
  const howItWorkSecondStepMainHeading = howItWorkSecondStepData?.heading;
  const howItWorkSecondStepDescription = howItWorkSecondStepData?.description;
  const howItWorkSecondStepInstruction = howItWorkSecondStepData?.built_points_for_build_teams;
  const howItWorkSecondStepBudgetType = howItWorkSecondStepData?.how_it_works_budget_type_for_build_team;

  // step 3
  const howItWorkThirdStepImage = howItWorkThirdStepData?.image;
  const howItWorkThirdStepHeading = howItWorkThirdStepData?.heading;
  const howItWorkThirdStepDescription = howItWorkThirdStepData?.description;
  const howItWorkThirdStepInstruction = howItWorkThirdStepData?.built_point_for_assign_task_for_client;
  const howItWorkThirdStepFaqs = howItWorkThirdStepData?.frequently_asked_question_for_assign_task_for_client[0]
    ?.question_answer_for_assign_task_for_client;

  // Faq
  const faqHeading = howItWorksFrequentlyAskedQuestionData?.main_heading;
  const subHeading = howItWorksFrequentlyAskedQuestionData?.sub_heading;
  const howItWorksFaqs = howItWorksFrequentlyAskedQuestionData?.how_it_works_questions_and_answer;

  return (
    <>
      <HeroSection />
      <Container variant="public">
        {howItWorksFirstStepDataLoading ? (
          <Box className="d-flex justify-content-center">
            <SectionSkeletonLoader containerHeight="700px" />
          </Box>
        ) : (
          <>
            <Box className="text-center mb-5">
              <Typography variant="h2" color={darkPurple}>
                {howItWorksMainHeading}
              </Typography>
            </Box>

            <StepsToBecomeClient
              dir="ltr"
              image={howItWorksStep1Image}
              title={howItWorksStep1Heading}
              description={howItWorksStep1Description}
              stepCount={1}
              listItems={howItWorksStep1Instructions}
              faqs={howItWorksStep1Faqs}
              accordion
            />
          </>
        )}

        {howItWorksSecondStepDataLoading ? (
          <Box className="d-flex justify-content-center">
            <SectionSkeletonLoader containerHeight="700px" />
          </Box>
        ) : (
          <Box>
            <StepsToBecomeClient
              dir="rtl"
              image={howItWorkSecondStepImage}
              title={howItWorkSecondStepMainHeading}
              description={howItWorkSecondStepDescription}
              stepCount={2}
              listItems={howItWorkSecondStepInstruction}
            />

            <Grid container className={`${styles.timeBasedhiring} mb-3`} columnSpacing={3}>
              {howItWorkSecondStepBudgetType?.map((item, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  className="d-flex align-items-start justify-content-center flex-column"
                  key={item?.id}
                >
                  <div className={styles.countingWrapper}>
                    <Typography color={darkPurple} variant="h6" className="weight-600">
                      {idx + 1}
                    </Typography>
                  </div>
                  <Typography color={darkPurple} variant="h6" className="my-3 weight-600">
                    {item.heading}
                  </Typography>
                  <Typography color={darkPurple} variant="body1">
                    {item?.text}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {howItWorksThirdStepDataLoading ? (
          <Box className="d-flex justify-content-center">
            <SectionSkeletonLoader containerHeight="700px" />
          </Box>
        ) : (
          <StepsToBecomeClient
            dir="ltr"
            image={howItWorkThirdStepImage}
            title={howItWorkThirdStepHeading}
            description={howItWorkThirdStepDescription}
            stepCount={3}
            listItems={howItWorkThirdStepInstruction}
            faqs={howItWorkThirdStepFaqs}
            accordion
          />
        )}
      </Container>

      <PersonReview />

      <FaqContainer
        heading={faqHeading}
        subHeading={subHeading}
        faqs={howItWorksFaqs}
        isLoading={howItWorksFrequentlyAskedQuestionLoading}
      />
    </>
  );
}

export default BecomeAnExpertClient;
