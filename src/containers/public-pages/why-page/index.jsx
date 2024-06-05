import React from 'react';

// Components
import ValuesContainer from 'containers/public-pages/common/components/ValuesContainer';
import FaqContainer from './components/FaqContainer';
import MainContainer from './components/MainContainer';
import ServicesContainer from './components/ServicesContainer';
import WhyNynxContainer from './components/WhyNynxContainer';
import WhatIsNynxContainer from '../common/components/WhatIsNynxContainer';

function WhyPage() {
  return (
    <>
      <MainContainer />

      <ValuesContainer />

      <WhatIsNynxContainer />

      <WhyNynxContainer />

      <ServicesContainer />

      <FaqContainer />
    </>
  );
}

export default WhyPage;
