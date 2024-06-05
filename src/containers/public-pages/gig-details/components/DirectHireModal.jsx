import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Divider, Modal, Stack, Typography, Avatar, useTheme } from '@mui/material';
import propTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';

// common hook
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// SERVICES
import {
  useGetAvailableWorkspacesToHireQuery,
  useCreateWorkspaceMutation,
} from 'services/private/workspace/workspace';
import { useDirectHiringMutation } from 'services/private/freelancerOnboarding';

// COMPONENTS
import FormikSelectField from 'shared/components/form/FormikSelectField';
import FormikField from 'shared/components/form/FormikField';
import SubmitButton from 'containers/common/components/SubmitButton';

// STYLES
import {
  DirectHireBoxStyles,
  directHireTitleStyles,
  gigImageStyles,
  createWorkSpaceButtonStyles,
} from 'styles/mui/public-pages/gig-details/gig-details-styles';

// utilities
import { formatName, conditionalBadgeOfExpert } from 'utilities/helpers';
import { CLIENT_ORDER } from 'utilities/constants';
import { directHireInitValues } from '../utilities/initialValues';
import {
  directHireAhocValidation,
  directHireMonthlyValidation,
  createWorkspaceValidation,
} from '../utilities/validationScema';
import { monthsOptions } from '../utilities/data';

// custom hook
import useTransformWorkspacesOptions from '../../../../custom-hooks/useTransformWorkspaceOptions';

function DirectHireModal({
  isOpen,
  handleToggle,
  gigDetails,
  featurePrice,
  gigPackageType,
  isAdhoc,
  deadline,
}) {
  const theme = useTheme();
  const colors = theme.palette;
  const greyColor = colors.grey.dark;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const formikRef = useRef(null);

  const { gigId } = useParams();
  const { userInfo } = useSelector(state => state.auth);

  const { data: workspacesData = [], isSuccess: workspacesDataSuccess } = useGetAvailableWorkspacesToHireQuery();

  const [
    directHiring,
    { error: directHiringError, isSuccess: directHireSuccess, isLoading: directHiringLoading, data },
  ] = useDirectHiringMutation();

  const [
    createWorkspace,
    {
      data: createWorkspaceData,
      isSuccess: createWorkspaceSucess,
      error: createWorkspaceError,
      isLoading: createWorkspaceLoading,
    },
  ] = useCreateWorkspaceMutation();

  // state
  const [isWorkspaceAvailable, setIsWorkspaceAvailable] = useState(null);

  // Transformer custom hook
  const transformedWorkspaceOptions = useTransformWorkspacesOptions(workspacesData, setIsWorkspaceAvailable);

  // api response
  const directHiringMessage = 'Freelancer has been Hired';
  useHandleApiResponse(directHiringError, directHireSuccess, directHiringMessage);

  const createWorkspaceMessage = 'Workspace has been created';
  useHandleApiResponse(createWorkspaceError, createWorkspaceSucess, createWorkspaceMessage);

  // constants
  const isLargeDescription = gigDetails?.description?.length > 300;
  const gigDescription = isLargeDescription
    ? gigDetails?.description?.substring(0, 299)
    : gigDetails?.description;

  const workspaceValidation = isWorkspaceAvailable && createWorkspaceValidation;
  const directHirevalidationScema = isAdhoc ? directHireAhocValidation : directHireMonthlyValidation;
  const firstName = gigDetails?.profile?.first_name;
  const lastName = gigDetails?.profile?.last_name;
  const userName = gigDetails?.profile?.username;
  const reviewCount = gigDetails?.review_count;
  const rating = gigDetails?.rating;
  const profileLevelBadge = conditionalBadgeOfExpert(gigDetails?.seller_level);

  const [description, setDescription] = useState(gigDescription);

  const descriptionHandler = () => {
    if (gigDetails?.description.length > description.length) {
      setDescription(gigDetails?.description);
    } else {
      setDescription(gigDetails?.description.substring(0, 299));
    }
  };

  useEffect(() => {
    if (workspacesDataSuccess) {
      setIsWorkspaceAvailable(workspacesData?.length > 0);
    }
  }, [workspacesDataSuccess, createWorkspaceSucess]);

  useEffect(() => {
    if (directHireSuccess) {
      handleToggle();
      navigate('/payment/checkout', {
        state: { checkoutState: { from: pathname, taskId: data?.id, taskVia: CLIENT_ORDER } },
      });
    }
  }, [directHireSuccess]);

  useEffect(() => {
    if (createWorkspaceSucess) {
      setIsWorkspaceAvailable(true);
      formikRef.current.setFieldValue('workspace', createWorkspaceData?.id);
    }
  }, [createWorkspaceSucess]);

  const handleCloseDirectHireModel = () => {
    setIsWorkspaceAvailable(workspacesData?.length > 0);
    handleToggle();
  };

  return (
    <Modal open={isOpen} onClose={handleToggle}>
      <Box sx={DirectHireBoxStyles}>
        <Formik
          initialValues={directHireInitValues}
          innerRef={formikRef}
          validationSchema={isWorkspaceAvailable ? directHirevalidationScema : workspaceValidation}
          onSubmit={(submittedValues, { resetForm }) => {
            const budgetType = isAdhoc ? 'project_budget' : 'monthly_based';

            if (!isWorkspaceAvailable) {
              createWorkspace({ title: submittedValues.title });
              resetForm();
            } else if (isAdhoc) {
              directHiring({
                gig: gigId,
                profile: userInfo?.id,
                workspace: submittedValues?.workspace,
                budget_type: budgetType,
                gig_package: gigPackageType,
                timeline: deadline?.[gigPackageType],
                rates: featurePrice?.[gigPackageType],
              });
              resetForm();
            } else {
              directHiring({
                gig: gigId,
                profile: userInfo?.id,
                workspace: submittedValues?.workspace,
                month: submittedValues?.month,
                budget_type: budgetType,
                gig_package: gigPackageType,
                timeline: submittedValues?.month,
                rates: (featurePrice?.[gigPackageType] || 0) * (submittedValues?.month || 1),
              });
              resetForm();
            }
          }}
        >
          {({ values }) => (
            <Form>
              {/* HEADER */}
              <Box className="d-flex align-items-center justify-content-between px-4 py-3">
                <Typography variant="h6">
                  Start task to
                  <span className="ps-1" style={directHireTitleStyles}>
                    {formatName(firstName, lastName, userName)}
                  </span>
                </Typography>

                <Stack spacing={2} direction="row">
                  <Button onClick={handleCloseDirectHireModel} className="px-4 py-2">
                    Cancel
                  </Button>

                  <SubmitButton
                    title="Save"
                    className="px-4 py-2"
                    isLoading={directHiringLoading || createWorkspaceLoading}
                  />
                </Stack>
              </Box>

              <Divider light />

              {/* FORM BODY */}
              {isWorkspaceAvailable ? (
                <Box className="d-flex flex-column align-items-start px-4 py-3">
                  <Box className="w-100 my-2 col-md-12 col-sm-12">
                    <Box className="col-md-12 col-sm-12">
                      <Typography variant="body2" className="mb-1">
                        Select the Workspace
                      </Typography>

                      <FormikSelectField options={transformedWorkspaceOptions} name="workspace" fullWidth />
                    </Box>
                    {!isAdhoc && (
                      <Box className="col-md-12 col-sm-12">
                        <Typography variant="body2" className="mb-1 mt-2">
                          Select Number of Months
                        </Typography>

                        <FormikSelectField options={monthsOptions} name="month" fullWidth />
                      </Box>
                    )}
                  </Box>
                  <Box
                    className="d-flex p-3 w-100"
                    sx={{ border: '1px solid #F1EFF0', borderRadius: '5px', gap: 1 }}
                  >
                    <Box className="col-md-3">
                      <Box
                        sx={{
                          background: `url(${gigDetails?.gig_image[0]?.image}) center no-repeat`,
                          ...gigImageStyles,
                        }}
                      />
                    </Box>
                    <Box className="col-md-9">
                      <Box>
                        <Typography variant="body1" className="mb-1 weight-600">
                          {gigDetails?.title}
                        </Typography>
                      </Box>
                      <Box className="my-1">
                        <Typography variant="body2" className="mb-1" color={greyColor}>
                          {rating} ({reviewCount} Reviews)
                        </Typography>
                      </Box>
                      <Box className="d-flex justify-content-between my-2">
                        <Box className="d-flex">
                          <Avatar
                            src={gigDetails?.profile?.image}
                            alt={gigDetails?.profile?.username}
                            sx={{ cursor: 'pointer', height: '50px', width: '50px' }}
                          />
                          <Box className="d-flex flex-column  justify-content-center ms-1">
                            <Typography variant="body2" className="fw-bold">
                              {gigDetails?.profile?.username}
                            </Typography>
                            <Box>
                              <img src={profileLevelBadge} alt="profile-level-badge" />
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          {isAdhoc ? (
                            <>
                              <Typography variant="body2" className="fw-bold">
                                ${featurePrice?.[gigPackageType]}
                              </Typography>
                              <Typography variant="body2" color={greyColor}>
                                Fixed
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography variant="body2" className="fw-bold">
                                ${(featurePrice?.[gigPackageType] || 0) * (values?.month || 1)}
                              </Typography>
                              <Typography variant="body2" color={greyColor}>
                                Monthly
                              </Typography>
                            </>
                          )}
                        </Box>
                        {isAdhoc ? (
                          <Box>
                            <Typography variant="body2" className="fw-bold">
                              {deadline?.[gigPackageType]} day
                            </Typography>
                            <Typography variant="body2" color={greyColor}>
                              Delivery
                            </Typography>
                          </Box>
                        ) : (
                          <Box>
                            <Typography variant="body2" className="fw-bold">
                              {values?.month || 1} Month
                            </Typography>
                            <Typography variant="body2" color={greyColor}>
                              Delivery
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      <Box>
                        <Typography variant="body2" className="my-2" color={greyColor}>
                          {description}
                          {isLargeDescription && (
                            <button
                              type="button"
                              style={createWorkSpaceButtonStyles}
                              onClick={descriptionHandler}
                            >
                              {gigDetails?.description.length > description.length ? '...More' : 'less'}
                            </button>
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box className="d-flex px-4 py-2 my-2 ">
                  <Box className="w-100 mb-4">
                    <Typography variant="body1" className="text-center mb-2 fw-bold">
                      Create Workspace to Continue
                    </Typography>
                    <FormikField name="title" placeholder="Title of Workspace" type="text" fullWidth />
                  </Box>
                </Box>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

DirectHireModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleToggle: propTypes.func.isRequired,
  gigDetails: propTypes.object.isRequired,
  deadline: propTypes.object,
  featurePrice: propTypes.object.isRequired,
  gigPackageType: propTypes.string.isRequired,
  isAdhoc: propTypes.bool,
};

DirectHireModal.defaultProps = {
  isAdhoc: false,
  deadline: {},
};

export default DirectHireModal;
