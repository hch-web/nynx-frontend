import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Modal, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// API HOOKS
import { useGetPrivacyPolicyQuery } from 'services/private/terms-privacy';

// COMPONENTS & STYLES
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { formModalStyles } from 'styles/mui/components/modal-styles';
import ContentModalForm from './components/ContentModalForm';

function PrivacyPolicy() {
  const contentBoxRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const isAdmin = useSelector(state => state?.auth?.userInfo?.is_superuser);

  // API HOOKS
  const { data, isLoading } = useGetPrivacyPolicyQuery();

  useEffect(() => {
    if (data?.length > 0 && contentBoxRef.current) {
      contentBoxRef.current.innerHTML = data[0]?.privacy_policy;
    }
  }, [data, contentBoxRef]);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <Container variant="public">
      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box sx={formModalStyles}>
          <ContentModalForm data={data} toggle={toggleModal} />
        </Box>
      </Modal>

      <Stack mb={3} direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Typography variant="h1">Privacy Policy</Typography>

        {isAdmin && (
          <Button variant="contained" color="secondary" className="px-4 py-2" onClick={toggleModal}>
            Manage Content
          </Button>
        )}
      </Stack>

      {!isLoading ? <Box ref={contentBoxRef} /> : <SectionLoader />}
    </Container>
  );
}

export default PrivacyPolicy;
