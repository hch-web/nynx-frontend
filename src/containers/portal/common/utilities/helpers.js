export const checkIsMessageSentByMe = (loggedId, ownerId) => loggedId === ownerId;

export const transformOptions = array => array?.map(item => ({
  ...item.response,
  last_message_time: item.response.last_message_time || item.response.room_created_at,
}));
