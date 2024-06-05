import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import useApiServices from 'custom-hooks/useApiServices';

// services
import {
  useGetDescriptionDataQuery,
  useUpdateDescriptionMutation,
} from 'services/private/gig/create/description';

// styles
import { addQuestionStyles } from 'styles/mui/public-pages/create-gig/description-styles';

// common
import FormikField from 'shared/components/form/FormikField';
import LayoutWrapper from '../../common/LayoutWrapper';
import Label from '../../common/Label';
import SubmitButton from '../../../../common/components/SubmitButton';

// components
import AddFaqModal from '../AddFaqModal';
import FrequentlyAskedQuestions from '../FrequentlyAskedQuestions';

// utilities
import { descriptionInitialValues } from '../../utilities/initialValues';
import { descriptionValidation } from '../../utilities/validationSchema';

function DesciptionTab() {
  const navigate = useNavigate();
  const formikRef = useRef(null);
  const { userInfo } = useSelector(state => state.auth);

  const { invalidatePrivateTags } = useApiServices();

  const [isAddFaqModalOpen, setIsAddFaqModalOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const gigId = searchParams.get('id');

  const { data: descriptionData } = useGetDescriptionDataQuery(gigId, { skip: !gigId });
  const [
    updateDescription,
    {
      isSuccess: updateDescriptionSuccess,
      isLoading: updateDescriptionLoading,
      error: updateDescriptionError,
    },
  ] = useUpdateDescriptionMutation();

  // API RESPONSE
  const updateDescriptionsuccessMessage = 'Gig has been created Successfully';
  useHandleApiResponse(updateDescriptionError, updateDescriptionSuccess, updateDescriptionsuccessMessage);

  const toggleFaqModal = () => setIsAddFaqModalOpen(!isAddFaqModalOpen);

  useEffect(() => {
    if (formikRef && descriptionData) {
      formikRef.current.setFieldValue('description', descriptionData?.description || '');
      formikRef.current.setFieldValue('faq', descriptionData?.faq);
    }
  }, [descriptionData, formikRef]);

  useEffect(() => {
    if (updateDescriptionSuccess) navigate(`/profile/${userInfo?.id}`);
  }, [updateDescriptionSuccess]);

  const handleCancel = () => {
    invalidatePrivateTags(['GetGigList']);
    navigate(`/profile/${userInfo?.id}`);
  };

  return (
    <LayoutWrapper title="Description">
      <Formik
        initialValues={descriptionInitialValues}
        innerRef={formikRef}
        onSubmit={async values => {
          await updateDescription({ ...values, gig: gigId });
        }}
        validationSchema={descriptionValidation}
      >
        <Form>
          <Box className="py-3 px-4">
            <Box sx={{ minHeight: '30vw' }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  className="text-center text-md-start mb-3 mb-sm-3 mb-md-0 pe-0 pe-md-2"
                >
                  <Label>Project summary</Label>
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                  <FormikField
                    name="description"
                    placeholder="Description"
                    type="textarea"
                    fullWidth
                    wordsCounter
                    maxWords={1200}
                  />
                </Grid>
              </Grid>

              <Grid container className="my-3">
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  className="text-center text-md-start mb-3 mb-sm-3 mb-md-0 pe-0 pe-md-2"
                >
                  <Label>Frequently asked questions</Label>
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                  <Button sx={addQuestionStyles} className="py-3" onClick={toggleFaqModal}>
                    Add a Question
                  </Button>
                  {/* Frequently asked questions */}
                  <FrequentlyAskedQuestions />
                  {/* add Frequenetaly Asked Question modal */}
                  <AddFaqModal
                    name="faq"
                    isAddFaqModalOpen={isAddFaqModalOpen}
                    toggleFaqModal={toggleFaqModal}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className="border-top py-3 px-4 d-flex justify-content-end">
              <Button className="me-3" onClick={handleCancel}>
                Cancel
              </Button>
              <SubmitButton
                title="Save & Continue"
                className="px-lg-5 px-md-3 px-sm-1 py-2"
                isLoading={updateDescriptionLoading}
              />
            </Box>
          </Box>
        </Form>
      </Formik>
    </LayoutWrapper>
  );
}

export default DesciptionTab;
