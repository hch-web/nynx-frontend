import React, { useState } from 'react';
import { Grid, Box, Typography, useTheme, Button } from '@mui/material';

// API HOOKS
import { useDeleteCardMutation, useListCardsQuery } from 'services/private/payments/cards';

// STYLES
import styles from 'styles/portal/freelancer/profile/profile.module.scss';

// UTILITIES & COMPONENTS
import { getCardImgFromBrand } from 'utilities/helpers';
import CardDetailsModal from './CardDetailsModal';

function CardList() {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API HOOKS
  const { data: cardsData } = useListCardsQuery();
  const [deleteCard, { isLoading }] = useDeleteCardMutation();

  // COLORS
  const colors = theme.palette;
  const parrot = colors.parrot.main;
  const darkPurple = colors.darkPurple.main;
  const darkgrey = colors.grey.dark;

  // HANDLER FUNCTIONS
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteCard = async id => {
    await deleteCard(id);
  };

  return (
    <Box className={`${styles.billingAddressContainer} px-3 px-lg-4 px-md-4 px-sm-4 ms-0`}>
      <Box className={`${styles.cardContainer} px-0 py-4`}>
        {cardsData?.data?.length > 0 ? (
          cardsData?.data?.map((item, idx) => (
            <Grid container key={item?.id} className={`${styles.addressBox} p-3 my-3`}>
              {/* CARD INFO BOX */}
              <Grid item lg={10} md={10} sm={12} xs={12}>
                <Box>
                  <Typography variant="dashboardh5" className="weight-700" color={darkPurple}>
                    {item?.billing_details?.name}
                  </Typography>

                  {idx === 0 && (
                    <Button variant="contained" className={`${styles.primaryButton} px-3 py-1 ms-1`}>
                      <Typography variant="dashboardCaption2" className="weight-700" color={parrot}>
                        Primary
                      </Typography>
                    </Button>
                  )}
                </Box>

                <Box className="d-flex align-items-start flex-wrap gap-2 pt-3 mb-3 mb-md-0">
                  <Box className="col-12 col-lg-auto">
                    <img src={getCardImgFromBrand(item?.card?.brand)} alt="card" />
                  </Box>

                  <Box className="col-12 col-lg-10">
                    <Box>
                      <Typography
                        variant="dashboardh6"
                        className="weight-700 text-capitalize"
                        color={darkPurple}
                      >
                        {`${item?.card?.brand} **** ${item?.card?.last4}`}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="dashboardBody" className="weight-500" color={darkgrey}>
                        {`Card expires at ${item?.card?.exp_month}/${item.card?.exp_year}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* CARD ACTION BUTTONS */}
              <Grid
                item
                lg={2}
                md={2}
                sm={12}
                xs={12}
                className="d-flex align-items-center justify-content-center justify-content-md-end gap-2"
              >
                <Button className="px-2 py-2 ms-1 rounded">Edit</Button>

                <Button
                  key={item?.id}
                  variant="danger"
                  className="px-2 py-2 ms-1 rounded"
                  disabled={isLoading}
                  onClick={() => handleDeleteCard(item?.id)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          ))
        ) : (
          <Box>No Cards Found! Please Add one.</Box>
        )}

        <CardDetailsModal isOpen={isModalOpen} handleClose={handleToggleModal} />
      </Box>
    </Box>
  );
}

export default CardList;
