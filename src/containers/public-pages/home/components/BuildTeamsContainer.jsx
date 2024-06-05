import React, { useMemo } from 'react';
import { Grid, useTheme, Typography, Card, CardContent, Container, Box } from '@mui/material';

// COMPONENTS & STYLES & SERVICES
import styles from 'styles/public-pages/homepage/homepage.module.scss';
import { buildTeamCardImagesStyles } from 'styles/mui/public-pages/homepage/home-styles';
import { useBuildTeamSectionQuery } from 'services/public/home/home';
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';

function BuildTeamsContainer() {
  const theme = useTheme();
  const colors = theme.palette;

  const { data: teamSectionData, isLoading: teamSectionDataLoading } = useBuildTeamSectionQuery();

  // constants
  const mainHeading = useMemo(() => teamSectionData?.main_heading, [teamSectionData]);
  const heading = useMemo(() => teamSectionData?.heading, [teamSectionData]);
  const description = useMemo(() => teamSectionData?.description, [teamSectionData]);
  const buildTeamCards = useMemo(() => teamSectionData?.build_team, [teamSectionData]);

  return teamSectionDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container
      variant="public"
      className={`${styles.teamBox} d-flex justify-content-center align-items-center flex-column `}
    >
      <Typography variant="h2" align="center" color={colors.darkPurple.main} className="mb-2">
        {mainHeading}
        <br /> {heading}
      </Typography>
      <Typography variant="h6" color={colors.darkPurple.main} className="mb-3 mb-sm-5 px-2" align="center">
        {description}
      </Typography>

      <Grid container justifyContent="center" alignItems="stretch" spacing={2}>
        {buildTeamCards?.map(item => (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            key={item.id}
            className="d-flex d-sm-block align-items-center justify-content-center"
          >
            <Card sx={{ background: colors.lightYellow.main }} className="d-flex flex-column h-100">
              <Box className="row d-flex justify-content-end">
                <Box className="col-11 py-4">
                  <Box
                    sx={{
                      background: `url(${item?.image}) center no-repeat`,
                      ...buildTeamCardImagesStyles,
                    }}
                  />
                </Box>
              </Box>

              <CardContent className={`${styles.teamCardContent}`}>
                <Typography
                  variant="h3"
                  color={colors.darkPurple.main}
                  className="text-capitalize mb-2 weight-500"
                >
                  {item?.main_heading}
                  <br className="d-none d-sm-none d-md-block" />
                  {item?.heading}
                </Typography>

                <Typography variant="body1" className="text-capitalize" color={colors.darkPurple.main}>
                  {item?.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BuildTeamsContainer;
