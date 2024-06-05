export const notificationsStyles = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    width: '430px',
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

export const notificationListStyles = {
  height: '450px',
  overflowY: 'auto',
};

export const notificationUnreadIconStyles = {
  fontSize: '9px',
  position: 'absolute',
  right: '0px',
  background: '#F7625A',
  color: '#fff',
  borderRadius: '50%',
  top: '-12px',
  padding: '3px 5px',

};

export const notificationIsReadStyles = {
  background: '#F1F5F6',
  '&:hover': { background: '#fff1e2' },
};

export const notificationItemStyles = {
  '&:hover': { background: '#fff1e2' },
};

export const notificationContainerStyles = {
  width: '425px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  '@media screen and (max-width: 777px)': { width: '300px' },
};

export const notificationImageResponsiveStyles = {
  '@media screen and (max-width: 777px)': { display: 'none !important' },
};

export const notificationImageStyles = {
  width: '60px',
  height: '50px',
  backgroundSize: 'cover',
  maxWidth: '100%',
  borderRadius: '5px',
};

export const notificationSenderImageStyles = {
  width: '70px',
  height: '70px',
  '@media screen and (max-width: 777px)': { width: '45px', height: '45px' },
};
