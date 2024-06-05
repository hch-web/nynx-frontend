import React from 'react';
import { useListCardsQuery } from 'services/private/payments/cards';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// Utilities
import { getCardImgFromBrand } from 'utilities/helpers';

function StripeAccountInfo({ setSelectedPaymentMethod }) {
  const { data: cardsList } = useListCardsQuery();

  const handleSelectCard = id => {
    setSelectedPaymentMethod(id);
  };

  return (
    <div>
      {cardsList?.data?.map(item => (
        <Box key={item?.id} className="d-flex align-items-center gap-3 my-2">
          <input type="radio" name="selec-card" onChange={() => handleSelectCard(item?.id)} />

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
    </div>
  );
}

StripeAccountInfo.propTypes = {
  setSelectedPaymentMethod: PropTypes.func,
};

StripeAccountInfo.defaultProps = {
  setSelectedPaymentMethod: () => {},
};

export default StripeAccountInfo;
