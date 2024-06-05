import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, useTheme, IconButton, Card, Stack, Chip } from '@mui/material';
import { Edit, Add, Delete, Circle } from '@mui/icons-material';
import propTypes from 'prop-types';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import moment from 'moment';

// IMAGES
import profileDummyImg from 'assets/dummy-profile.png';

// SERVICES HOOKS
import {
  useDeleteSkillMutation,
  useDeleteEducationMutation,
  useGetSkillsEducationQuery,
  useGetUserTemplatesQuery,
} from 'services/private/profile';
import { addTemplateRoute, viewTemplatesRoute, templateBaseRoute } from 'utilities/routing-links';
import { useCreateRoomMutation } from 'services/private/chat';
import useGetGlobalAppContext from 'custom-hooks/useGetGlobalAppContext';

// STYLES
import styles from 'styles/public-pages/freelancer-profile/freelancer-profile.module.scss';
import {
  aboutShowTemplateImgItemStyles,
  addTemplateIconStyle,
  aboutProfileImgBoxStyles,
  profileOnlineIconStyles,
} from 'styles/mui/public-pages/freelancer-profile/freelancer-profile-styles';

// SHARED UTILITIES
import { conditionalBadgeOfExpert, formatName } from 'utilities/helpers';

// SHARED
import ProfileCompletnessProgressBar from './ProfileCompletnessProgressBar';
import Rating from '../../../common/components/Rating';
import SkillsModal from './SkillsModal';
import AboutModal from './AboutModal';
import EducationModal from './EducationModal';
import BasicInfoModal from './BasicInfoModal';
import AllEducationInfoModal from './AllEducationInfoModal';

function AboutProfile({ canUserEdit, user }) {
  const { enqueueSnackbar } = useSnackbar();
  const { id: profileId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  // MODAL STATES
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [isEducationInfoModalOpen, setEducationInfoModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState(null);

  // GET REDUX STATE
  const { isAuthenticated, userInfo } = useSelector(state => state.auth);
  const { users } = useGetGlobalAppContext();

  // THEME COLORS
  const colors = theme.palette;
  const primary = colors.primary.main;
  const darkPurple = colors.darkPurple.main;
  const parrot = colors.parrot.main;
  const grey = colors.grey.main;

  // API HOOKS
  const { data: userSkillEducationData } = useGetSkillsEducationQuery(user?.id, { skip: !user?.id });
  const [createRoom, { isSuccess: roomSuccess }] = useCreateRoomMutation();
  const { data: userTemplatesData } = useGetUserTemplatesQuery(user?.id, { skip: !user?.id });
  const [deleteSkill] = useDeleteSkillMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  useEffect(() => {
    if (roomSuccess) navigate('/portal/client/chat');
  }, [roomSuccess]);

  // MODAL HANDLER FUNCTIONS
  const toggleSkillModal = () => {
    setIsSkillModalOpen(!isSkillModalOpen);
  };

  const toggleEducationModal = () => {
    setIsEducationModalOpen(!isEducationModalOpen);
  };

  const toggleProfileAboutModal = () => {
    setIsAboutModalOpen(!isAboutModalOpen);
  };

  const toggleBasicInfoModal = () => {
    setIsBasicInfoModalOpen(!isBasicInfoModalOpen);
  };

  const handleEditEducation = id => {
    setSelected(id);
    toggleEducationModal();
  };

  const toggleEductionInfoModal = () => {
    setEducationInfoModalOpen(!isEducationInfoModalOpen);
  };

  // DELETE HANDLER FUNCTIONS
  const deleteSkillsHandler = async id => {
    await deleteSkill(id);
    enqueueSnackbar('Skill Deleted', { variant: 'success' });
  };

  const deleteEducationHandler = async id => {
    await deleteEducation(id);
    enqueueSnackbar('Education Deleted', { variant: 'success' });
  };

  const handleCreateRoom = async () => {
    if (canUserEdit) navigate('/portal/client/chat');
    else await createRoom({ owner: userInfo?.id, partner: profileId });
  };

  // CONSTANTS
  const isAboutInfoNull = user?.tag_line === null && user?.description === null;
  const profileImageUrl = user?.image || profileDummyImg;
  const fullName = formatName(user?.first_name, user?.last_name, user?.username);
  const country = user?.country_label || 'NA';
  const isBuyer = user?.is_buyer;
  const freelancerTotalJobs = user?.total_job;
  const freelancerCompletedJobs = user?.total_completed_job || 0;
  const freelancerTotalEarning = user?.total_earning || 0;
  const clientTotalJobs = user?.total_workspaces || 0;
  const clientTotalHires = user?.total_completed_workspaces || 0;
  const totalInvestment = user?.total_investments || 0;
  const timezoneLabel = user?.timezone_label || 'NA';
  const isUserOnline = users?.find(item => item?.profile === +profileId)?.online_status;
  const userRating = user?.rating;
  const userReviews = user?.review;
  const profileLevelBadge = conditionalBadgeOfExpert(user?.seller_level);
  const isShowProfileProgressBar = canUserEdit && !isBuyer;
  const userSlicedEducation = userSkillEducationData?.educations?.slice(0, 2);

  return (
    <>
      <EducationModal
        selected={selected}
        setSelected={setSelected}
        isEducationModalOpen={isEducationModalOpen}
        toggleEducationModal={toggleEducationModal}
        userId={user?.id}
      />

      <BasicInfoModal
        openBasicInfoModal={isBasicInfoModalOpen}
        handleBasicInfoModal={toggleBasicInfoModal}
        user={user}
      />

      <AboutModal
        isAboutModalOpen={isAboutModalOpen}
        toggleProfileAboutModal={toggleProfileAboutModal}
        user={user}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      <SkillsModal
        isSkillModalOpen={isSkillModalOpen}
        toggleSkillModal={toggleSkillModal}
        userId={user?.id}
      />

      <AllEducationInfoModal
        educationData={userSkillEducationData?.educations || []}
        isOpen={isEducationInfoModalOpen}
        toggle={toggleEductionInfoModal}
      />

      <Box className={styles.freelancerProfile}>
        <Grid container spacing={2} className="d-flex flex-wrap justify-content-between">
          {/* USER BASIC PROFILE COLUMN */}
          <Grid item xs={12} md={12} lg={6} xl={4}>
            <Card className="p-3 bg-white">
              <Box className="d-flex align-items-start">
                <Box className="position-relative">
                  <Box
                    sx={{
                      background: `#dbdbdb url(${profileImageUrl}) no-repeat center`,
                      ...aboutProfileImgBoxStyles,
                    }}
                  />

                  <Circle
                    sx={{
                      color: isUserOnline ? parrot : grey,
                      ...profileOnlineIconStyles,
                    }}
                  />
                </Box>

                <Box className="col ps-3 pt-2">
                  <Typography variant="h5" color={darkPurple}>
                    {fullName}
                  </Typography>

                  <img src={profileLevelBadge} alt="profile-level-badge" />

                  <Box
                    className={`${styles.profileText} d-flex gap-2 justify-content-start align-items-center flex-wrap mt-1`}
                  >
                    <Box className="d-flex">
                      <Rating
                        name="rating-value"
                        value={userRating}
                        className={styles.ratingIcons}
                        size="small"
                      />
                    </Box>

                    <Box>
                      <Typography variant="caption" color={darkPurple}>
                        {userRating}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="caption" color={darkPurple}>
                    {userReviews} Reviews
                  </Typography>

                  <Box className="mt-4 d-flex align-items-center">
                    {!canUserEdit && (
                      <Button
                        variant="contained"
                        color="secondary"
                        className={`${styles.messageBtn} me-3 mt-2 mt-sm-2 mt-md-2 mt-lg-0 w-75 flex-grow-1`}
                        onClick={handleCreateRoom}
                      >
                        Message
                      </Button>
                    )}

                    {canUserEdit && (
                      <IconButton className={styles.profileEditButton} onClick={toggleBasicInfoModal}>
                        <Edit />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Box>
              {/* progress bars */}
              <Box className="mt-2">{isShowProfileProgressBar && <ProfileCompletnessProgressBar />}</Box>
            </Card>
          </Grid>

          {/* USER PROFILE INFO COLUMN */}
          <Grid item xs={12} md={12} lg={6} xl={4}>
            <Card className="p-3 h-100 w-100 bg-white">
              <Box className="d-flex justify-content-between ">
                <Typography variant="body1" color={primary}>
                  From
                </Typography>

                <Typography variant="body1" color={primary} className="weight-500">
                  {country}
                </Typography>
              </Box>

              <Box className="d-flex justify-content-between mt-2">
                <Typography variant="body1" color={primary}>
                  Member
                </Typography>

                <Typography variant="body1" color={primary} className="weight-500">
                  {moment(userInfo?.created_at).format('MMM YYYY')}
                </Typography>
              </Box>

              {isBuyer ? (
                <>
                  <Box className="d-flex justify-content-between mt-2">
                    <Typography variant="body1" color={primary}>
                      Total Workspaces
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      {clientTotalJobs}
                    </Typography>
                  </Box>

                  <Box className="d-flex justify-content-between mt-2">
                    <Typography variant="body1" color={primary}>
                      Completed Workspaces
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      {clientTotalHires}
                    </Typography>
                  </Box>

                  <Box className="d-flex justify-content-between mt-2">
                    <Typography variant="body1" color={primary}>
                      All Time Investment
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      {totalInvestment}
                    </Typography>
                  </Box>

                  <Box className="d-flex justify-content-between mt-2">
                    <Typography variant="body1" color={primary}>
                      Time Zone
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      {timezoneLabel}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box className="d-flex justify-content-between mt-2">
                    <Typography variant="body1" color={primary}>
                      Total Jobs
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      {freelancerTotalJobs}
                    </Typography>
                  </Box>

                  <Box className="d-flex justify-content-between mt-2">
                    <Typography variant="body1" color={primary}>
                      Completed Jobs
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      {freelancerCompletedJobs}
                    </Typography>
                  </Box>

                  <Box className="d-flex justify-content-between mt-2 ">
                    <Typography variant="p" color={primary}>
                      All-Time Earnings
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      ${freelancerTotalEarning}
                    </Typography>
                  </Box>
                </>
              )}
            </Card>
          </Grid>

          {/* USER SKILLS COLUMN */}
          <Grid item xs={12} md={12} lg={12} xl={4}>
            <Card className="mx-auto p-3 w-100 h-100 bg-white">
              <Typography variant="h5" color={primary}>
                Skills
              </Typography>

              <Stack direction="row" className="flex-wrap align-items-center">
                {userSkillEducationData?.skills?.length > 0 ? (
                  <>
                    {userSkillEducationData.skills.map(item => (
                      <Chip
                        label={item.name}
                        variant="contained"
                        className={`mt-2 me-2 p-2 align-self-start ${canUserEdit ? 'pe-0' : ''}`}
                        onDelete={canUserEdit ? () => deleteSkillsHandler(item.id) : undefined}
                        key={item.id}
                        sx={{ background: '#FFE3C5' }}
                      />
                    ))}

                    {canUserEdit && (
                      <IconButton className="my-2 align-self-start" onClick={toggleSkillModal}>
                        <Add sx={{ borderRadius: '50%' }} color={darkPurple} />
                      </IconButton>
                    )}
                  </>
                ) : (
                  <Box className="flex-grow-1 text-center mt-1 mt-sm-1 mt-md-2 mt-lg-4">
                    <Typography variant="body1">No skill found!</Typography>
                  </Box>
                )}
              </Stack>

              <Box className="d-flex align-items-center justify-content-center">
                {canUserEdit && userSkillEducationData?.skills?.length === 0 && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={toggleSkillModal}
                    className="mx-auto"
                  >
                    Add
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* ABOUT INFO COLUMN */}
      <Grid container spacing={2} className={`${styles.freelancerAbout} mt-3`}>
        <Grid item lg={9} md={12} sm={12} xs={12} className="d-flex">
          <Box className={`${styles.descriptionContainer} flex-grow-1 d-flex flex-column`}>
            <Box className="d-flex justify-content-end p-0 p-md-0 p-lg-2">
              {canUserEdit && user && !isAboutInfoNull && (
                <IconButton
                  aria-label="delete"
                  className={styles.profileEditButton}
                  onClick={() => {
                    toggleProfileAboutModal();
                    setIsEditing(true);
                  }}
                >
                  <Edit />
                </IconButton>
              )}
            </Box>

            <Box className="px-2 px-lg-4 px-md-1 pb-3 pt-2 pt-md-0 flex-grow-1 d-flex">
              {canUserEdit && isAboutInfoNull ? (
                <Box className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                  <Typography variant="h3" color={primary} className="mb-3">
                    No Record Found!
                  </Typography>

                  <Button variant="contained" color="secondary" onClick={toggleProfileAboutModal}>
                    ADD
                  </Button>
                </Box>
              ) : (
                <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
                  <Box className="d-flex flex-column align-items-start justify-content-start">
                    <Box>
                      <Typography variant="h3" color={primary}>
                        {user?.tag_line}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body1"
                        color={primary}
                        className={`${styles.newLineBreak} mt-3`}
                        sx={{ wordBreak: 'break-all' }}
                      >
                        {user?.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {user && isAboutInfoNull && !isAuthenticated && (
                <Box className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                  <Typography variant="h3" color={primary} className="mb-3">
                    No Record Found!
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>

        {/* EDUCATION & TEMPLATE GRID ITEM */}
        <Grid item lg={3} md={12} sm={12} xs={12}>
          <Box className={`${styles.eductationContainer} p-4 p-md-3`}>
            <Typography variant="h5" color={primary}>
              Education
            </Typography>

            {/* EDUCATION LIST CONTAINER */}
            <Box>
              {userSkillEducationData?.educations.length > 0 ? (
                userSlicedEducation?.map(item => (
                  <Box className="mt-3 d-flex flex-column align-items-start" key={item.id}>
                    <Box className="d-flex align-items-center justify-content-between w-100">
                      <Typography variant="body1" color={primary} className="flex-grow-1">
                        {item.title}
                      </Typography>

                      {canUserEdit && (
                        <Box className="col-2 d-flex align-items-center justify-content-center">
                          <IconButton className="me-1" onClick={() => handleEditEducation(item?.id)}>
                            <Edit sx={{ fontSize: '18px', color: '#705B25' }} />
                          </IconButton>

                          <IconButton onClick={() => deleteEducationHandler(item.id)}>
                            <Delete sx={{ fontSize: '18px' }} className="text-danger" />
                          </IconButton>
                        </Box>
                      )}
                    </Box>

                    <Typography variant="caption2" color="#A08D92">
                      {item.institute}, Graduated {item.year}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body1" className="my-2 mt-3">
                  No Record Found
                </Typography>
              )}

              <Stack direction="row" spacing={1} mt={1}>
                <Button
                  variant="contained"
                  color="primary"
                  className="px-2 py-1"
                  onClick={toggleEductionInfoModal}
                >
                  Show All
                </Button>

                {canUserEdit && (
                  <IconButton onClick={toggleEducationModal}>
                    <Add />
                  </IconButton>
                )}
              </Stack>
            </Box>
          </Box>

          {/* TEMPLATE BOX */}
          <Box className={`${styles.templateContainer} p-4 p-md-3 mt-2`}>
            <Box className="d-flex justify-content-between align-items-center">
              <Typography variant="h5" color={primary}>
                Template
              </Typography>
              <Button variant="contained" color="secondary" className={`${styles.viewBtn} py-1 px-4 px-md-2`}>
                <Link
                  to={`${templateBaseRoute}/${user?.id}/${viewTemplatesRoute}`}
                  className="text-decoration-none"
                >
                  <Typography variant="caption" color={primary}>
                    View
                  </Typography>
                </Link>
              </Button>
            </Box>

            <Box className="mt-3 d-flex align-items-center flex-wrap" sx={{ gap: '0.2rem' }}>
              {Array.isArray(userTemplatesData)
                && userTemplatesData?.slice(0, 2)?.map(template => template?.images?.slice(0, 1).map(item => (
                  <Box
                    sx={{
                      background: `url(${item?.image}) center no-repeat`,
                      ...aboutShowTemplateImgItemStyles,
                    }}
                    key={item.id}
                  />
                )))}

              {canUserEdit && (
                <Box
                  className={`${styles.addTemplate} d-flex flex-column justify-content-center align-items-center`}
                >
                  <Link
                    to={`${templateBaseRoute}/${user?.id}/${addTemplateRoute}`}
                    className="text-decoration-none"
                  >
                    <Box className="text-center mb-1">
                      <Add sx={addTemplateIconStyle} />
                    </Box>

                    <Box className="text-center">
                      <Typography
                        sx={{ fontSize: '10px' }}
                        variant="body2"
                        className="text-center weight-600 "
                        color={darkPurple}
                      >
                        Add Template
                      </Typography>
                    </Box>
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

AboutProfile.propTypes = {
  canUserEdit: propTypes.bool.isRequired,
  user: propTypes.object,
};

AboutProfile.defaultProps = {
  user: null,
};

export default AboutProfile;
