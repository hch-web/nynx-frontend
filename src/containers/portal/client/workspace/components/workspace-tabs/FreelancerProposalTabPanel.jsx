import React, { useEffect } from 'react';
import { Avatar, Box, Button, Card, CircularProgress, Typography, useTheme } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

import {
  useListWorkspaceProposalsQuery,
  useUpdateProposalMutation,
  useUpdateProposalInactiveStatusMutation,
} from 'services/private/workspace/freelancers';

// STYLES
import {
  freelancerInvitedTabAvatarStyles,
  jobStatusBtnStyles,
  proposalGigImageStyles,
} from 'styles/mui/portal/workspace-styles';

// IMAGES
import blankImage from 'assets/jobPostingBlank.png';

// UTILITIES
import { IN_PROGRESS, JOB_OFFER, REJECTED, PENDING } from 'utilities/constants';
import {
  conditionalBadgeOfExpert,
  conditionalStatusVariant,
  formatStatus,
  formatTimeline,
} from 'utilities/helpers';
import SectionLoader from 'containers/common/loaders/SectionLoader';

function FreelancerProposalTabPanel() {
  const theme = useTheme();

  const { workspaceId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    data: proposalsData,
    workspaceLoading,
    refetch,
    isFetching,
  } = useListWorkspaceProposalsQuery(workspaceId, {
    skip: !workspaceId,
  });

  // COLORS
  const colors = theme.palette;
  const mainRed = colors.red.main;

  const [updateProposal, { isLoading }] = useUpdateProposalMutation();
  const [updateProposalInactiveStatus, { isLoading: updateJobStatusLoading }] = useUpdateProposalInactiveStatusMutation();

  const handleAcceptProposal = async (id, status) => {
    try {
      const payload = { id, status };
      navigate('/payment/checkout', {
        state: {
          checkoutState: { from: pathname, taskId: id, taskVia: JOB_OFFER, payload, type: JOB_OFFER },
        },
      });
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const handleRejectProposal = async (id, status) => {
    try {
      const payload = { id, status };
      const updateResp = await updateProposal(payload);

      if (updateResp.data && status === REJECTED) {
        enqueueSnackbar('Proposal Rejected Successfully', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const handleUpdateSkillStatus = async id => {
    try {
      const payload = { id, is_closed: true };
      const updateResp = await updateProposalInactiveStatus(payload);

      if (updateResp.data) {
        enqueueSnackbar('Job has been Closed', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <Box>
      {!(workspaceLoading || isFetching) ? (
        <Box className="d-flex flex-column align-items-start" sx={{ gap: '10px' }}>
          {proposalsData?.length > 0 ? (
            proposalsData?.map(item => {
              const isClose = item?.is_closed;
              const isHired = item?.is_hired;
              const isShowInfoMsg = isHired && !isClose;

              return (
                <Box key={item.id} className="w-100">
                  <Box className="d-flex justify-content-between">
                    <Typography variant="h6" className="mb-2 fw-600">
                      {item?.title}
                      <Typography variant="dashboardCaption" className="mb-0 fw-400 ms-2" color={mainRed}>
                        {isClose && '(This job has been closed)'}
                      </Typography>
                    </Typography>
                    {isShowInfoMsg && (
                      <Box className="d-flex gap-2 align-items-center">
                        <Typography variant="dashboardCaption" className="mb-0 fw-600">
                          You have already hired on this job, do you want to close?
                        </Typography>
                        <Button
                          className="px-4 py-2"
                          variant="danger"
                          sx={jobStatusBtnStyles}
                          onClick={() => handleUpdateSkillStatus(item?.id)}
                          startIcon={updateJobStatusLoading ? <CircularProgress size={16} /> : undefined}
                        >
                          Yes
                        </Button>
                      </Box>
                    )}
                  </Box>

                  {item?.skill_offer?.length > 0 ? (
                    item?.skill_offer?.map(offer => {
                      const budgetType = offer.budget_type === 'monthly_based' ? 'Monthly' : 'Fixed';
                      const budget = `$${Math.floor(offer?.rates)}`;
                      const isPendingProposal = offer?.status === PENDING;
                      const profileLevelBadge = conditionalBadgeOfExpert(offer?.seller_level);
                      return (
                        <Card
                          key={offer?.id}
                          className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-md-start align-items-start ms-3 p-4 mt-2"
                        >

                          <Box
                            sx={{
                              background: `url(${offer?.gig_main_image}) center no-repeat`,
                              ...proposalGigImageStyles,
                            }}
                          />

                          {/* CARD CONTENT */}
                          <Box className="ms-0 mt-3 mt-md-0 ms-md-3 flex-grow-1">
                            <Box
                              sx={{ gap: '10px' }}
                              className="d-flex flex-wrap flex-xl-nowrap align-items-start"
                            >
                              <Box className="col-8 col-lg-12 col-xl-7 d-flex flex-column align-items-start mb-3 flex-grow-1">
                                <Typography variant="body1" className="fw-600 mb-3">
                                  {offer?.gig_title}
                                </Typography>

                                {/* FREELANCER GIG INFO */}
                                <Box
                                  className="d-flex flex-wrap flex-sm-nowrap align-items-center justify-content-center justify-content-sm-start"
                                  sx={{ gap: '20px' }}
                                >
                                  {/* AVATAR BOX */}
                                  <Box
                                    className="d-flex align-items-center pointer text-decoration-none text-black"
                                    component={Link}
                                    to={`/profile/${offer?.profile}`}
                                  >
                                    <Avatar
                                      src={offer?.freelancer_prof_img}
                                      alt="profile"
                                      sx={freelancerInvitedTabAvatarStyles}
                                    />

                                    <Box className="ms-2">
                                      <Typography className="fw-600 text-capitalize" variant="body2">
                                        {offer?.first_name}
                                      </Typography>
                                      <img src={profileLevelBadge} alt="profile-level-badge" />
                                    </Box>
                                  </Box>

                                  {/* BUDGET BOX */}
                                  <Box>
                                    <Typography className="fw-600" variant="body2">
                                      {budget}
                                    </Typography>

                                    <Typography variant="body2" className="text-muted text-capitalize">
                                      {budgetType}
                                    </Typography>
                                  </Box>

                                  {/* DELIVERY BOX */}
                                  <Box>
                                    <Typography className="fw-600" variant="body2">
                                      {formatTimeline(offer?.timeline, offer?.budget_type)}
                                    </Typography>

                                    <Typography variant="body2" className="text-muted">
                                      Delivery
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>

                              {/* ACTIONS BUTTONS WRAPPER */}
                              <Box
                                className="col-12 col-lg-12 col-xl-auto mb-2 mb-xl-0 d-flex align-items-center flex-wrap"
                                sx={{ gap: '10px' }}
                              >
                                {!isPendingProposal ? (
                                  <Button variant={conditionalStatusVariant(offer?.status)}>
                                    {formatStatus(offer?.status)}
                                  </Button>
                                ) : (
                                  <>
                                    <Button
                                      onClick={() => handleRejectProposal(offer?.id, REJECTED)}
                                      className="py-2"
                                      variant="outlined"
                                      disabled={isClose}
                                    >
                                      Reject Offer
                                    </Button>

                                    <Button
                                      onClick={() => handleAcceptProposal(offer?.id, IN_PROGRESS)}
                                      className="px-4 py-2"
                                      variant="contained"
                                      color="secondary"
                                      disabled={isClose}
                                      startIcon={isLoading && <CircularProgress size={16} />}
                                    >
                                      Hire
                                    </Button>
                                  </>
                                )}
                              </Box>
                            </Box>

                            <Typography variant="body2" className="text-muted responsive-text">
                              {offer?.description}
                            </Typography>
                          </Box>
                        </Card>
                      );
                    })
                  ) : (
                    <Box>No Proposals Found!</Box>
                  )}
                </Box>
              );
            })
          ) : (
            <Box className="d-flex flex-column align-items-center justify-content-center w-100 py-5">
              <img src={blankImage} alt="Blank-Record-Img" />

              <Typography variant="h6" className="fw-600 mt-3 text-muted">
                No Record Found!
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Box className="my-5 py-5">
          <SectionLoader />
        </Box>
      )}
    </Box>
  );
}

export default FreelancerProposalTabPanel;
