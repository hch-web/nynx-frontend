import React, { memo, useMemo } from 'react';
import { Grid, Typography, useTheme, Container, Box } from '@mui/material';

// COMPONENTS & STYLES & SERVICES
import {
  valuesContainerFontStyles,
  valueSectionImageStyles,
} from 'styles/mui/public-pages/why-page/why-page-styles';
import { useWhyPageValueSectionQuery } from 'services/public/why-page/whyPage';
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';

function ValuesContainer() {
  const { palette } = useTheme();
  const darkPurple = palette.darkPurple.main;
  const paleOrange = palette.paleOrange.main;

  const { data: whyPageValueSectionData, isLoading: whyPageValueSectionDataLoading } = useWhyPageValueSectionQuery();

  // Constants
  const mainHeading = useMemo(() => whyPageValueSectionData?.heading, [whyPageValueSectionData]);
  const description = useMemo(() => whyPageValueSectionData?.description, [whyPageValueSectionData]);
  const image = useMemo(() => whyPageValueSectionData?.image, [whyPageValueSectionData]);

  return whyPageValueSectionDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public" className="pb-0 pt-3 pt-lg-4 pt-md-4">
      <Box sx={{ background: darkPurple, borderRadius: '15px ' }} className="p-3 p-sm-5">
        <Grid container className="align-items-center justify-content-center">
          <Grid item md={6}>
            <Typography variant="h2" color={paleOrange} className="mb-4">
              {mainHeading}
            </Typography>
            <Typography variant="h6" color={paleOrange} sx={valuesContainerFontStyles}>
              {description}
            </Typography>
          </Grid>
          <Grid item md={6} className="d-none d-sm-none d-md-block">
            <Box
              sx={{
                background: `url(${image}) center no-repeat`,
                ...valueSectionImageStyles,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default memo(ValuesContainer);
