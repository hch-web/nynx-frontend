import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import propTypes from 'prop-types';

// UTILITIES & COMPONENTS
import { getCardImgFromBrand } from 'utilities/helpers';
import { paymentMethodLists } from '../utilities/data';

function PaymentMethodGridItem({
  cardsList,
  setSelectedPaymentMethod,
  selectedPaymentMethod,
  toggleCardModal,
}) {
  const handleSelectCard = id => {
    setSelectedPaymentMethod(id);
  };

  return (
    <Grid item xs={12} sm={12} md={8}>
      {/* CUSTOMIZE YOUR ORDER BOX */}
      <Box className="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between border-bottom px-4 py-4">
        <Box className="col-12 col-sm-12 col-md-8 mb-3 mb-md-0 pe-0 pe-md-3">
          <Typography variant="h6" className="fw-500">
            Customize your order
          </Typography>

          <Typography variant="body2">
            Choose any extra services you want to include in this project
          </Typography>
        </Box>

        {!cardsList?.data?.length > 0 && (
          <Box className="col-12 col-sm-12 col-md text-start text-md-end">
            <Button onClick={toggleCardModal} variant="outlined">
              Add a Billing Method
            </Button>
          </Box>
        )}
      </Box>

      {/* LIST PAYMENT METHODS */}
      <Box className="d-flex flex-column align-items-start gap-3 px-4 py-3">
        {cardsList?.data?.map(item => (
          <Box key={item?.id} className="d-flex align-items-center gap-3">
            <input
              type="radio"
              name="selec-card"
              value={selectedPaymentMethod}
              onChange={() => handleSelectCard(item?.id)}
            />

            <Box className="d-flex align-items-center gap-3">
              <img src={getCardImgFromBrand(item?.card?.brand)} alt="card" />

              <Box>
                <Typography variant="body1" className="fw-500 text-capitalize">
                  {`${item?.card?.brand} **** ${item?.card?.last4}`}
                </Typography>

                <Typography variant="body2" className="text-muted">
                  {`Card expires at ${item?.card?.exp_month}/${item?.card?.exp_year}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}

        {paymentMethodLists?.map(item => (
          <Box key={item.id} className="d-flex align-items-center gap-3">
            <input
              type="radio"
              name="select-card"
              value={selectedPaymentMethod}
              checked={selectedPaymentMethod === item.method}
              onChange={() => handleSelectCard(item.method)}
            />

            <Box className="d-flex align-items-center gap-3">
              {item?.img && <img src={getCardImgFromBrand(item.method)} alt="card" />}

              <Typography variant="body1" className="fw-500 text-capitalize">
                {item.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Grid>
  );
}

PaymentMethodGridItem.propTypes = {
  setSelectedPaymentMethod: propTypes.func.isRequired,
  toggleCardModal: propTypes.func.isRequired,
  selectedPaymentMethod: propTypes.string,
  cardsList: propTypes.object,
};

PaymentMethodGridItem.defaultProps = {
  selectedPaymentMethod: '',
  cardsList: {},
};

export default PaymentMethodGridItem;
