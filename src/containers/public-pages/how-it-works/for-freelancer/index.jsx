import React from 'react';

// Services
import {
  useHowItWorksExpertFrequentlyAskedQuestionsQuery,
  useHowItWorksExpertReviewsQuery,
} from 'services/public/how-it-works/forExperts';

// Components
import FaqContainer from 'containers/public-pages/common/components/FaqContainer';
import HeroSection from './components/HeroSection';
import CommunityFreelancers from './components/CommunityFreelancers';
import FreelancerInstructions from './components/FreelancerInstructions';
import TopFreelancerReviews from '../../common/components/TopFreelancerReviews';

function BecomeAnExpertFreelancer() {
  const { data: frequentlyAskedQuestionData, isLoading: frequentlyAskedQuestionDataLoading } = useHowItWorksExpertFrequentlyAskedQuestionsQuery();
  const { data: howItWorksExpertReviewsSectionData, isLoading: howItWorksExpertReviewsSectionDataLoading } = useHowItWorksExpertReviewsQuery();

  // faq
  const heading = frequentlyAskedQuestionData?.main_heading;
  const subHeading = frequentlyAskedQuestionData?.sub_heading;
  const faqs = frequentlyAskedQuestionData?.how_it_works_questions_and_answer;

  // reviews
  const howItWorksExpertReviewMainHeading = howItWorksExpertReviewsSectionData?.main_heading;
  const howItWorksExpertReviewDescription = howItWorksExpertReviewsSectionData?.description;
  const howItWorksExpertReviewsArray = howItWorksExpertReviewsSectionData?.how_it_works_public_content_component_for_freelancer_page;

  return (
    <>
      <HeroSection />

      <CommunityFreelancers />

      <FreelancerInstructions />

      <TopFreelancerReviews
        mainHeading={howItWorksExpertReviewMainHeading}
        description={howItWorksExpertReviewDescription}
        isLoading={howItWorksExpertReviewsSectionDataLoading}
        reviews={howItWorksExpertReviewsArray}
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

export default BecomeAnExpertFreelancer;
