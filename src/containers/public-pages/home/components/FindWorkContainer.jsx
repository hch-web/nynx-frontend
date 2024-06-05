import React, { memo, useMemo } from 'react';
import { Grid, useTheme, Typography, Box, Container } from '@mui/material';

// Services
import { useFindWorkSectionQuery } from 'services/public/home/home';

// IMAGES & STYLES
import styles from 'styles/public-pages/homepage/homepage.module.scss';
import { findWorkContainerImageStyles } from 'styles/mui/public-pages/homepage/home-styles';

// Component
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';

function FindWorkContainer() {
  const theme = useTheme();
  const colors = theme.palette;
  const lightOrange = colors.lightOrange.main;

  const { data: findWorkSectionData, isLoading: findWorkSectionDataLoading } = useFindWorkSectionQuery();

  // Constants
  const mainImage = useMemo(() => findWorkSectionData?.image, [findWorkSectionData]);
  const contentFor = useMemo(() => findWorkSectionData?.content_for, [findWorkSectionData]);
  const mainHeadingOne = useMemo(() => findWorkSectionData?.main_heading_one, [findWorkSectionData]);
  const headingOne = useMemo(() => findWorkSectionData?.heading_one, [findWorkSectionData]);
  const descriptionOne = useMemo(() => findWorkSectionData?.description_one, [findWorkSectionData]);
  const headingTwo = useMemo(() => findWorkSectionData?.heading_two, [findWorkSectionData]);
  const descriptionTwo = useMemo(() => findWorkSectionData?.description_two, [findWorkSectionData]);
  const headingThree = useMemo(() => findWorkSectionData?.heading_three, [findWorkSectionData]);
  const descriptionThree = useMemo(() => findWorkSectionData?.description_three, [findWorkSectionData]);
  const headingFour = useMemo(() => findWorkSectionData?.heading_four, [findWorkSectionData]);
  const descriptionFour = useMemo(() => findWorkSectionData?.description_four, [findWorkSectionData]);

  return findWorkSectionDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public" className={`${styles.findWorkSectionBox} mt-5 pb-2`}>
      <Grid container className={`${styles.findWorkGridContainer}`} sx={{ background: lightOrange }}>
        <Grid
          item
          md={6}
          lg={6}
          xl={6}
          className={`${styles.findWorkGridImgWrapper} d-none d-sm-none d-md-block`}
        >
          <Box
            className={`${styles.findWorkImg}`}
            sx={{
              background: `url(${mainImage}) top right no-repeat`,
              ...findWorkContainerImageStyles,
            }}
          />
        </Grid>

        <Grid item md={6} lg={6} xl={6} className="ps-3 pe-3 p-sm-3 p-md-5 p-lg-4 p-xl-5 py-4">
          <Typography variant="caption" className="text-white" color={colors.paleOrange.main}>
            {contentFor}
          </Typography>
          <Typography variant="h2" color={colors.darkPurple.main} className="my-4">
            {mainHeadingOne}
          </Typography>

          <Grid container spacing={2}>
            <Grid item sm={12} md={12} lg={11} xl={11}>
              <Typography color={colors.darkPurple.main} variant="h3" mb={1}>
                {headingOne}
              </Typography>
              <Typography color={colors.darkPurple.main} variant="body1">
                {descriptionOne}
              </Typography>
            </Grid>

            <Grid item sm={12} md={12} lg={11} xl={11}>
              <Typography color={colors.darkPurple.main} variant="h3" mb={1}>
                {headingTwo}
              </Typography>
              <Typography color={colors.darkPurple.main} variant="body1">
                {descriptionTwo}
              </Typography>
            </Grid>

            <Grid item sm={12} md={12} lg={11} xl={11}>
              <Typography color={colors.darkPurple.main} variant="h3" mb={1}>
                {headingThree}
              </Typography>
              <Typography color={colors.darkPurple.main} variant="body1">
                {descriptionThree}
              </Typography>
            </Grid>

            <Grid item sm={12} md={12} lg={11} xl={11}>
              <Typography color={colors.darkPurple.main} variant="h3" mb={1}>
                {headingFour}
              </Typography>
              <Typography color={colors.darkPurple.main} variant="body1">
                {descriptionFour}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default memo(FindWorkContainer);
