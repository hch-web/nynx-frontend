import React from 'react';
import { Box, Button, Card, CardContent, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// Styles
import styles from 'styles/portal/client/workspace-general.module.scss';
import { rejectDeliverableBtnStyles } from 'styles/mui/portal/deliverable-tab-styles';

// Utilities
import { COMPLETED } from 'utilities/constants';
import { convertMillisecondsToDuration, getLocaleDate, setIconByFileType } from 'utilities/helpers';
import { checkTimeDifference, formatDate, formatTime } from '../utilities/helper-functions';
// Components
import DeliveryDelayTime from './DeliveryDelayTime';

function DeliverableList({
  deliverables,
  deliveryDeadlineTime,
  handleOpenRevisionsModal,
  handleAcceptDelivery,
  taskDetails,
}) {
  const theme = useTheme();

  // COLORS
  const colors = theme.palette;
  const border = colors.border.main;
  const lightOrange = colors.lightOrange.main;

  // REDUX STATE
  const { is_buyer: isBuyer } = useSelector(state => state.auth.userInfo);

  const handleSaveFile = file => {
    saveAs(file);
  };

  return (
    <Box className="px-2">
      <ol>
        {deliverables?.map((item, idx, { length }) => {
          const deliveryCreatedTime = getLocaleDate(item?.created_at);
          const deliveryTimeDifference = checkTimeDifference(deliveryDeadlineTime, deliveryCreatedTime);
          const isDeliveryTimeInDelay = deliveryTimeDifference < 0;
          const duration = convertMillisecondsToDuration(deliveryTimeDifference);

          return (
            <li key={item.id}>
              <Box className="d-flex align-items-center gap-3">
                <Box className="d-flex align-items-center">
                  <Typography variant="body1" className="me-2 fw-500">
                    Delivery
                  </Typography>

                  <Typography variant="body1" className="text-muted">
                    {formatDate((item.created_at))}
                  </Typography>
                </Box>
                {isDeliveryTimeInDelay ? (
                  <DeliveryDelayTime
                    days={duration?.days}
                    hours={duration?.hours}
                    minutes={duration?.minutes}
                    seconds={duration?.seconds}
                  />
                ) : (
                  <Typography variant="body1" className="me-2">
                    {formatTime(deliveryCreatedTime)}
                  </Typography>
                )}
              </Box>
              {/* FILES CONTAINER */}
              <Box className="d-flex align-items-center my-3 gap-4">
                {item.attachments?.map(fileObj => (
                  <Card
                    className="pointer"
                    onClick={() => handleSaveFile(fileObj.file)}
                    key={fileObj?.id}
                    sx={{ borderColor: border }}
                  >
                    <CardContent className="text-center py-3 px-2">
                      <img src={setIconByFileType(fileObj?.file_type)} alt="file-Icon" />

                      <Box className="mt-2">
                        <Typography variant="body2" className="fw-500" sx={{ fontSize: '12px' }}>
                          {`${fileObj?.file_name?.slice(0, 12)}...`}
                        </Typography>

                        <Typography variant="body2" sx={{ fontSize: '10px' }} className="text-muted">
                          {moment(fileObj?.created_at)?.fromNow()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* REMARKS CONTAINER */}
              <Box>
                <Typography variant="body1" className="mb-2 fw-500">
                  Remarks
                </Typography>

                <Card sx={{ borderColor: lightOrange }}>
                  <CardContent>
                    <Typography variant="body2" className="text-muted">
                      {item.remarks}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              {/* REVISIONS BOX */}
              <Box className={`${styles.listItems} py-3`}>
                <ol className="ps-1">
                  {item?.deliverable_revisions?.map(revision => {
                    const revisionCreatedTime = getLocaleDate(revision?.created_at);
                    const revisionTimeDifference = checkTimeDifference(
                      deliveryDeadlineTime,
                      revisionCreatedTime
                    );
                    const isRevisionTimeInDelay = deliveryTimeDifference < 0;
                    const revisionDuration = convertMillisecondsToDuration(revisionTimeDifference);
                    return (
                      <li className="mb-3" key={revision?.id}>
                        <Box className="d-flex align-items-center gap-3">
                          <Typography variant="body1" className="me-2 fw-500">
                            Revision
                          </Typography>

                          <Typography variant="body1" className="text-muted">
                            {formatDate(revision?.created_at)}
                          </Typography>

                          {isRevisionTimeInDelay ? (
                            <DeliveryDelayTime
                              days={revisionDuration?.days}
                              hours={revisionDuration?.hours}
                              minutes={revisionDuration?.minutes}
                              seconds={revisionDuration?.seconds}
                            />
                          ) : (
                            <Typography variant="body1" className="me-2">
                              {formatTime(revisionCreatedTime)}
                            </Typography>
                          )}
                        </Box>
                        {/* FILES CONTAINER */}
                        <Box className="d-flex align-items-center my-3 gap-4">
                          {revision?.attachments?.map(revisionFile => (
                            <Card
                              className="pointer"
                              key={revisionFile?.id}
                              sx={{ borderColor: border }}
                              onClick={() => handleSaveFile(revisionFile?.file)}
                            >
                              <CardContent className="text-center py-3 px-2">
                                <img src={setIconByFileType(revisionFile?.file_type)} alt="file-Icon" />

                                <Box className="mt-2">
                                  <Typography variant="body2" className="fw-500" sx={{ fontSize: '12px' }}>
                                    {`${revisionFile?.file_name?.slice(0, 12)}...`}
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    sx={{ fontSize: '10px' }}
                                    className="text-muted"
                                  >
                                    {moment(revisionFile?.created_at)?.fromNow()}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          ))}
                        </Box>

                        {/* REMARKS CONTAINER */}
                        <Box>
                          <Typography variant="body1" className="mb-2 fw-500">
                            Remarks
                          </Typography>

                          <Card sx={{ borderColor: lightOrange }}>
                            <CardContent>
                              <Typography variant="body2" className="text-muted">
                                {revision?.remarks}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </li>
                    );
                  })}
                </ol>
              </Box>

              {/* REVISION ACTION BUTTONS */}
              {isBuyer && idx === length - 1 && taskDetails?.status !== COMPLETED && (
                <Box className="d-flex align-items-center justify-content-end gap-3">
                  <Button
                    onClick={() => handleOpenRevisionsModal(item.id)}
                    className="px-4 py-2"
                    variant="danger"
                    sx={rejectDeliverableBtnStyles}
                  >
                    Request Revision
                  </Button>

                  <Button
                    onClick={() => handleAcceptDelivery(item.id)}
                    className="px-4 py-2"
                    sx={{ padding: '5px 20px' }}
                    variant="contained"
                    color="secondary"
                  >
                    Accept
                  </Button>
                </Box>
              )}
            </li>
          );
        })}
      </ol>
    </Box>
  );
}
DeliverableList.propTypes = {
  deliverables: PropTypes.array,
  deliveryDeadlineTime: PropTypes.string,
  handleOpenRevisionsModal: PropTypes.func,
  handleAcceptDelivery: PropTypes.func,
  taskDetails: PropTypes.object,
};

DeliverableList.defaultProps = {
  deliverables: [],
  deliveryDeadlineTime: '',
  taskDetails: {},
  handleOpenRevisionsModal: () => {},
  handleAcceptDelivery: () => {},
};

export default DeliverableList;
