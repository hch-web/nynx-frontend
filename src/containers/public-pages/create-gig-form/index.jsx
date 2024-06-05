import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

// styles
import { tabStyles, tabsStyles, previousTabStyles } from 'styles/mui/public-pages/create-gig/root-styles';

// ASSETS
import userIcon from 'assets/create-gig-user-icon.svg';
import priceIcon from 'assets/create-gig-pricing-icon.svg';
import galleryIcon from 'assets/create-gig-gallery-icon.svg';
import requirementIcon from 'assets/create-gig-requirement-icon.svg';
import descriptionIcon from 'assets/create-gig-description-icon.svg';

// common
import TabPanel from 'containers/common/components/TabPanel';

// components
import OverviewTab from './components/tabs/OverviewTab';
import PricingTab from './components/tabs/PricingTab';
import GalleryTab from './components/tabs/GalleryTab';
import RequirementsTab from './components/tabs/RequirementsTab';
import DesciptionTab from './components/tabs/DesciptionTab';

function CreateGigForm() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Box className="w-100">
      <Box>
        <Tabs sx={tabsStyles} value={currentTab} onChange={handleChange} className="mt-5 pt-3">
          <Tab
            disableRipple
            sx={currentTab > 0 ? previousTabStyles : tabStyles}
            label="Overview"
            icon={<img src={userIcon} alt="user-icon" />}
            iconPosition="start"
          />
          <Tab
            disableRipple
            sx={currentTab > 1 ? previousTabStyles : tabStyles}
            label="Pricing"
            icon={<img src={priceIcon} alt="price-icon" />}
            iconPosition="start"
            disabled={currentTab < 1}
          />
          <Tab
            disableRipple
            sx={currentTab > 2 ? previousTabStyles : tabStyles}
            label="Gallery"
            icon={<img src={galleryIcon} alt="gallery-icon" />}
            iconPosition="start"
            disabled={currentTab < 2}
          />
          <Tab
            disableRipple
            sx={currentTab > 3 ? previousTabStyles : tabStyles}
            label="Requirements"
            icon={<img src={requirementIcon} alt="requirement-icon" />}
            iconPosition="start"
            disabled={currentTab < 3}
          />
          <Tab
            disableRipple
            sx={tabStyles}
            label="Description"
            icon={<img src={descriptionIcon} alt="description-icon" />}
            iconPosition="start"
            disabled={currentTab < 4}
          />
        </Tabs>

        <TabPanel stateValue={currentTab} index={0}>
          <OverviewTab setCurrentTab={setCurrentTab} />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={1}>
          <PricingTab setCurrentTab={setCurrentTab} />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={2}>
          <GalleryTab setCurrentTab={setCurrentTab} />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={3}>
          <RequirementsTab setCurrentTab={setCurrentTab} />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={4}>
          <DesciptionTab />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default CreateGigForm;
