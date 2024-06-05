import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, Typography, Stack, Button, Divider, useTheme, Avatar } from '@mui/material';
import { Formik, Form } from 'formik';
import propTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';

// SERVICES
import {
  useGetAvailableWorkspacesToHireQuery,
  useCreateWorkspaceMutation,
} from 'services/private/workspace/workspace';

// HOOKS
import useTransformWorkspacesOptions from 'custom-hooks/useTransformWorkspaceOptions';

// STYLES
import {
  acceptOfferModalStyles,
  acceptOfferTitleStyles,
  gigImageStyles,
} from 'styles/mui/portal/Accept-offer-modal-styles';

// COMPONENTS
import SubmitButton from 'containers/common/components/SubmitButton';
import FormikSelectField from 'shared/components/form/FormikSelectField';
import FormikField from 'shared/components/form/FormikField';

// UTILITIES
import { conditionalBadgeOfExpert, formatName } from 'utilities/helpers';
import {
  ACCEPT_CUSTOM_OFFER,
  FIXED,
  IN_PROGRESS,
  JOB_OFFER,
  MONTHLY,
  PROJECT_BASED,
} from 'utilities/constants';
import { acceptOfferInitialValues } from './utilities/initialValues';
import { createWorkspaceValidation, acceptOfferValiadtion } from './utilities/schemaValidation';

function AcceptOfferModal({ isAcceptOfferModalOpen, handleToggleAcceptOfferModal, offerDetail }) {
  const theme = useTheme();
  const colors = theme.palette;
  const greyColor = colors.grey.dark;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // state
  const [isWorkspaceAvailable, setIsWorkspaceAvailable] = useState(null);
  const formikRef = useRef();

  const { data: workspacesData = [], isSuccess: workspacesDataSuccess } = useGetAvailableWorkspacesToHireQuery();
  const [
    createWorkspace,
    { data: createWorkspaceData, isSuccess: createWorkspaceSucess, isLoading: createWorkspaceLoading },
  ] = useCreateWorkspaceMutation();

  useEffect(() => {
    if (workspacesDataSuccess) {
      setIsWorkspaceAvailable(workspacesData?.length > 0);
    }
  }, [workspacesDataSuccess]);

  const handleCloseAcceptModal = () => {
    setIsWorkspaceAvailable(workspacesData?.length > 0);
    handleToggleAcceptOfferModal();
  };

  useEffect(() => {
    if (createWorkspaceSucess) {
      setIsWorkspaceAvailable(true);
      formikRef.current.setFieldValue('workspace', createWorkspaceData?.id);
    }
  }, [createWorkspaceSucess]);

  // Transformer custom hook
  const transformedWorkspaceOptions = useTransformWorkspacesOptions(workspacesData, setIsWorkspaceAvailable);
  const validationSchema = isWorkspaceAvailable ? acceptOfferValiadtion : createWorkspaceValidation;
  const budgetType = offerDetail?.offer?.budget_type === PROJECT_BASED ? FIXED : MONTHLY;
  const freelancerProfileImage = offerDetail?.image || offerDetail?.user_name;
  const DeliveryType = offerDetail?.offer?.budget_type === PROJECT_BASED ? 'Day' : 'Month';
  const rating = offerDetail?.offer?.rating;
  const reviewsCount = offerDetail?.offer?.review_count;
  const profileLevelBadge = conditionalBadgeOfExpert(offerDetail?.offer?.seller_level);

  return (
    <Modal open={isAcceptOfferModalOpen} onClose={handleCloseAcceptModal}>
      <Box className="bg-white" sx={acceptOfferModalStyles}>
        <Formik
          initialValues={acceptOfferInitialValues}
          validationSchema={validationSchema}
          innerRef={formikRef}
          onSubmit={(submittedValues, { resetForm }) => {
            if (isWorkspaceAvailable) {
              const payload = {
                workspace: submittedValues.workspace,
                status: IN_PROGRESS,
                offerId: offerDetail?.offer?.id,
                amount: offerDetail?.offer?.rates,
              };
              navigate('/payment/checkout', {
                state: {
                  checkoutState: {
                    from: pathname,
                    taskId: offerDetail?.offer?.id,
                    taskVia: JOB_OFFER,
                    payload,
                    type: ACCEPT_CUSTOM_OFFER,
                  },
                },
              });
            } else {
              createWorkspace({ title: submittedValues.title });
              resetForm();
            }
          }}
        >
          <Form>
            <Box className="d-flex align-items-center justify-content-between px-4 py-3">
              <Typography variant="h6">
                Offer from
                <span className="ps-1" style={acceptOfferTitleStyles}>
                  {formatName(offerDetail?.first_name, offerDetail?.last_name, offerDetail?.user_name)}
                </span>
              </Typography>

              <Stack spacing={2} direction="row">
                <Button onClick={handleCloseAcceptModal} className="px-4 py-2">
                  Cancel
                </Button>
                <SubmitButton
                  title={`${isWorkspaceAvailable ? 'Accept' : 'Create'}`}
                  className="px-4 py-2"
                  isLoading={createWorkspaceLoading}
                />
              </Stack>
            </Box>

            <Divider light />
            {isWorkspaceAvailable ? (
              <Box className="d-flex flex-column align-items-start px-4 py-3">
                <Box className="w-100 my-2 col-md-12 col-sm-12">
                  <Box className="col-md-12 col-sm-12">
                    <Typography variant="body2" className="mb-1">
                      Select the Workspace
                    </Typography>

                    <FormikSelectField options={transformedWorkspaceOptions} name="workspace" fullWidth />
                  </Box>
                </Box>
                <Box
                  className="d-flex p-3 w-100"
                  sx={{ border: '1px solid #F1EFF0', borderRadius: '5px', gap: 1 }}
                >
                  <Box className="col-md-3">
                    <Box
                      sx={{
                        background: `url(${offerDetail?.offer?.gig_main_image}) center no-repeat`,
                        ...gigImageStyles,
                      }}
                    />
                  </Box>
                  <Box className="col-md-9">
                    <Box>
                      <Typography variant="body1" className="mb-1 weight-600">
                        {offerDetail?.offer?.gig_title}
                      </Typography>
                    </Box>
                    <Box className="my-1">
                      <Typography variant="body2" className="mb-1" color={greyColor}>
                        {rating} ( {reviewsCount} Reviews )
                      </Typography>
                    </Box>
                    <Box className="d-flex justify-content-between my-2">
                      <Box className="d-flex">
                        <Avatar
                          src={freelancerProfileImage}
                          alt="profileImg"
                          sx={{ cursor: 'pointer', height: '50px', width: '50px' }}
                        />
                        <Box className="d-flex flex-column  justify-content-center ms-1">
                          <Typography variant="body2" className="fw-bold">
                            {formatName(
                              offerDetail?.first_name,
                              offerDetail?.last_name,
                              offerDetail?.user_name
                            )}
                          </Typography>
                          <img src={profileLevelBadge} alt="profile-level-badge" />
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant="body2" className="fw-bold">
                          ${offerDetail?.offer?.rates}
                        </Typography>
                        <Typography variant="body2" color={greyColor}>
                          {budgetType}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" className="fw-bold">
                          {offerDetail?.offer?.timeline} {DeliveryType}
                        </Typography>
                        <Typography variant="body2" color={greyColor}>
                          Delivery
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" className="my-2" color={greyColor}>
                        {offerDetail?.offer?.gig_description}
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
        </Formik>
      </Box>
    </Modal>
  );
}

AcceptOfferModal.propTypes = {
  isAcceptOfferModalOpen: propTypes.bool.isRequired,
  handleToggleAcceptOfferModal: propTypes.func,
  offerDetail: propTypes.object,
};

AcceptOfferModal.defaultProps = {
  offerDetail: {},
  handleToggleAcceptOfferModal: () => {},
};

export default AcceptOfferModal;
