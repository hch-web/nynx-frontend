import { colors } from '../colors';

const { lightOrange } = colors;

export const addPaymentMethodModalStyles = {
  width: '600px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  translate: '-50% -50%',
  outline: 'none',
  borderRadius: '20px',
};

export const paymentMethodCardGroupStyles = {
  gap: '20px',
  justifyContent: 'between',
};

export const paymentMethodCardStyles = {
  background: '#fff',
  padding: '20px',
  borderRadius: '10px !important',
  border: `1px solid ${lightOrange} !important`,
};
