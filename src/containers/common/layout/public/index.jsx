import React, { useMemo } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

// IMAGES
import navLogoLight from 'assets/nav-logo.svg';
import navLogoDark from 'assets/nav-logo-dark.svg';

// COMPONENTS
import Footer from './Footer';
import Navbar from './Navbar';
import CategoriesNavbar from './CategoriesNavbar';

function LayoutWrapper() {
  const { pathname } = useLocation();
  const theme = useTheme();
  const themeColors = theme.palette;

  const { isAuthenticated, userInfo } = useSelector(state => state.auth);
  const isBuyer = userInfo?.is_buyer;

  let color = themeColors.darkPurple.main;

  let footerBgColor = themeColors.darkPurple.main;
  let footerText = 'Work with the Best Experts to Increase Business Impact Today';
  let footerTextColor = themeColors.paleOrange.main;
  let footerButtonBg = themeColors.yellow.main;

  const isWhyPage = pathname === '/about';
  const isFindServicePage = pathname === '/find-service';
  const isHowItWorksPage = pathname === '/how-it-works-for-freelancer';
  const isHowItWorksClientsPage = pathname === '/how-it-works-for-clients';
  const isHomepage = pathname === '/';
  const isCreateGigPage = pathname.includes('/gig/create');
  const isBuyerRequestPage = pathname.includes('/freelancer/buyer-request');
  const isProfilePage = pathname.includes('/profile/');
  const isContactUsPage = pathname.includes('/contact-us');
  const isCategoriesBarDisable = isHomepage
    || isHowItWorksClientsPage
    || isHowItWorksPage
    || isWhyPage
    || isProfilePage
    || isContactUsPage;

  const navLogoImg = isWhyPage || isHowItWorksPage ? navLogoDark : navLogoLight;

  if (isWhyPage) {
    color = themeColors.lightOrange.main;
  }

  if (isHowItWorksPage) {
    color = '#F8D19E';
    footerText = 'Sign up and create your first Gig today';
    footerBgColor = themeColors.lightOrange.main;
    footerTextColor = themeColors.darkPurple.main;
    footerButtonBg = themeColors.darkPurple.main;
  }

  if (isHowItWorksClientsPage) {
    footerText = 'Find the talent needed to get your business growing';
  }

  const getCategoriesNavbar = useMemo(() => {
    if (
      isAuthenticated
      && !isHomepage
      && (isFindServicePage || isHowItWorksClientsPage || isProfilePage || (isBuyer && isWhyPage))
    ) {
      return <CategoriesNavbar />;
    }

    if (!isAuthenticated && isCategoriesBarDisable) {
      return null;
    }

    return null;
  }, [pathname, isAuthenticated]);

  return (
    <>
      <Navbar bgColor={color} logoImg={navLogoImg} whyPage={isWhyPage} howItWorks={isHowItWorksPage} />
      {getCategoriesNavbar}
      <Outlet />
      {!(isCreateGigPage || isBuyerRequestPage) && (
        <Footer
          footerText={footerText}
          footerBgColor={footerBgColor}
          textColor={footerTextColor}
          btnBg={footerButtonBg}
          btnText={footerBgColor}
        />
      )}
    </>
  );
}

export default LayoutWrapper;
