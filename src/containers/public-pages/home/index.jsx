import React, { memo, useMemo } from 'react';

// COMPONENTS & SERVICES
import { useFrequentlyAskedQuestionsQuery, useReviewSectionQuery } from 'services/public/home/home';
import ValuesContainer from 'containers/public-pages/common/components/ValuesContainer';
import CategoriesContainer from './components/CategoriesContainer';
import FreelancerReviews from './components/FreelancerReviews';
import HeroContainer from './components/HeroContainer';
import BuildTeamsContainer from './components/BuildTeamsContainer';
import ServicesProjectContainer from './components/ServicesProjectContainer';
import FindWorkContainer from './components/FindWorkContainer';
import PersonReview from '../common/components/PersonReview';
import TopFreelancerReviews from '../common/components/TopFreelancerReviews';
import FaqContainer from '../common/components/FaqContainer';

function Homepage() {
  const { data: frequentlyAskedQuestionData, isLoading: frequentlyAskedQuestionDataLoading } = useFrequentlyAskedQuestionsQuery();

  const { data: reveiwSectionData, isLoading: reviewSectionLoading } = useReviewSectionQuery();

  // FAQ DATA
  const heading = useMemo(() => frequentlyAskedQuestionData?.main_heading, [frequentlyAskedQuestionData]);
  const subHeading = useMemo(() => frequentlyAskedQuestionData?.sub_heading, [frequentlyAskedQuestionData]);
  const faqs = useMemo(() => frequentlyAskedQuestionData?.questionsandanswer, [frequentlyAskedQuestionData]);

  // Freelancers Review
  const reviewMainHeading = useMemo(() => reveiwSectionData?.main_heading, [reveiwSectionData]);
  const reviewDescription = useMemo(() => reveiwSectionData?.description, [reveiwSectionData]);
  const reviewsArray = useMemo(() => reveiwSectionData?.home_page_detail_component, [reveiwSectionData]);

  return (
    <>
      <HeroContainer />

      <CategoriesContainer />

      <FreelancerReviews />

      <BuildTeamsContainer />

      <PersonReview />

      <ServicesProjectContainer />

      <FindWorkContainer />

      <ValuesContainer />

      <TopFreelancerReviews
        mainHeading={reviewMainHeading}
        description={reviewDescription}
        isLoading={reviewSectionLoading}
        reviews={reviewsArray}
      />

      <FaqContainer
        heading={heading}
        subHeading={subHeading}
        faqs={faqs}
        isLoading={frequentlyAskedQuestionDataLoading}
      />
    </>
  );
}

export default memo(Homepage);
