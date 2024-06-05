import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  Avatar,
  IconButton,
  Stack,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { AttachFile, Send, SentimentSatisfiedAlt } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import EmojiPicker, { Theme as EmojiTheme, EmojiStyle } from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';

// API HOOKS
import {
  useLazyGetActivityMessagesQuery,
  useSendAttachmentsMutation,
} from 'services/private/workspace/activity';

// CUSTOM HOOKS
import useConnectWebSocket from 'custom-hooks/useConnectWebSocket';
import useApiServices from 'custom-hooks/useApiServices';

// STYLES
import {
  activityChatMessageBoxStyles,
  activityChatMessagesWrapperStyles,
  activityEmojiBoxStyles,
} from 'styles/mui/portal/workspace-styles';

// UTILITIES
import FormikField from 'shared/components/form/FormikField';
import { formatFileSize, formatName, getQueryParams, setIconByFileType } from 'utilities/helpers';
import { activityTabValSchema } from './utilities/schemaValidation';
import { getWsActivityURL } from '../../../utilities/socket-urls';

function ActivityTabPanel() {
  const { workspaceId } = useParams();
  const { invalidatePrivateTags } = useApiServices();
  const socket = useConnectWebSocket(getWsActivityURL(workspaceId));

  // STATE HOOKS
  const [isEmojiBoxOpen, setIsEmojiBoxOpen] = useState(false);
  const [chatMessages, _setChatMessages] = useState([]);
  const [isScrolling, setScrolling] = useState(false);

  // REF HOOKS
  const newMsgRef = useRef(null);
  const msgContainerRef = useRef(null);
  const inputFileRef = useRef(null);
  const chatMessagesStateRef = useRef(chatMessages);
  const queryPramsStateRef = useRef({ id: +workspaceId, limit: 100, offset: 0 });
  const totalMsgCountRef = useRef(null);

  // CUSTOM STATE SETTER
  const setChatMessages = data => {
    chatMessagesStateRef.current = data;
    _setChatMessages(data);
  };

  const setQueryParams = url => {
    const queryParams = getQueryParams(url, ['limit', 'offset']);

    const data = {
      ...queryParams,
      id: +workspaceId,
    };

    queryPramsStateRef.current = data;
  };

  // GETTING REDUX STATE
  const { id: userId } = useSelector(state => state.auth.userInfo);

  // API HOOKS
  const [getMessages] = useLazyGetActivityMessagesQuery();
  const [uploadAttachments, { isLoading }] = useSendAttachmentsMutation();

  // LOADING MESSAGE FUNCTION WHEN USER SCROLL TO TOP OF THE CHAT CONTAINER
  const getPrevMessages = async () => {
    const msgsResp = await getMessages(queryPramsStateRef.current);

    const recentViewedMsgId = chatMessagesStateRef.current?.at(-1);
    const getRecentViewedMsg = document.getElementById(`message-${recentViewedMsgId.id}`);
    getRecentViewedMsg?.scrollIntoView();

    const data = [...chatMessagesStateRef.current, ...msgsResp.data.results];

    const filteredData = data.filter(
      (item, idx, array) => array.findIndex(value => value.id === item.id) === idx
    );

    setChatMessages(filteredData);
    setQueryParams(msgsResp.data?.next);
  };

  // BY DEFAULT CONTAINER SCROLL WILL BE AT BOTTOM
  useEffect(() => {
    if (!isScrolling) newMsgRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [chatMessages, isScrolling]);

  // GETTING MESSAGE ON COMPONENT FIRST RENDER
  useEffect(() => {
    invalidatePrivateTags(['GetWorkspace', 'GetFreelancerWorkspace']);
    getMessages(queryPramsStateRef.current).then(res => {
      setChatMessages(res.data.results);
      totalMsgCountRef.current = res.data.count;

      setQueryParams(res.data?.next);
    });
  }, []);

  // HANDLING WEB-SOCKET ONMESSAGE EVENT
  useEffect(() => {
    if (socket) {
      socket.onmessage = e => {
        const data = JSON.parse(e.data);

        setChatMessages([data, ...chatMessagesStateRef.current]);
        totalMsgCountRef.current += 1;
      };
    }
  }, [socket]);

  // HANDLING SCROLL EFFECT OF THE CHAT CONTAINER
  useEffect(() => {
    msgContainerRef.current?.addEventListener('scroll', () => {
      const container = msgContainerRef.current;

      if (container?.scrollTop === 0 && !(totalMsgCountRef.current === chatMessagesStateRef.current.length)) {
        setScrolling(true);
        getPrevMessages();
      }

      if (container && container.scrollHeight - container.scrollTop === container.clientHeight) {
        setScrolling(false);
      }
    });

    return () => {
      msgContainerRef.current?.removeEventListener('scroll', () => {});
    };
  }, [msgContainerRef]);

  // HANDLER FUNCTIONS
  const handleToggleEmojiBox = () => {
    setIsEmojiBoxOpen(!isEmojiBoxOpen);
  };

  const handleAddEmoji = (emojiData, _, values, setFieldValue) => {
    setFieldValue('message', values.message + emojiData.emoji);
  };

  // UPLOADING FILES ONE BY ONE
  const handleAttachFile = e => {
    const files = [...e.target.files];

    files.forEach(async item => {
      const uploadAttachResp = await uploadAttachments({ file: item });

      const payload = JSON.stringify({
        message: uploadAttachResp?.data?.file,
        workspace: workspaceId,
        is_file: true,
        file: uploadAttachResp?.data?.id,
      });

      socket.send(payload);
    });
  };

  return (
    <Box className="bg-white" sx={{ borderRadius: '10px' }}>
      {/* HEADER */}
      <Box className="py-3 px-4">
        <Typography variant="h6" className="fw-500">
          Activity
        </Typography>
      </Box>

      <Divider light />

      {/* BODY */}
      <Box className="px-0 py-2">
        <Box sx={activityChatMessagesWrapperStyles} ref={msgContainerRef} id="cont">
          <Box sx={{ height: 'auto' }} className="d-flex flex-column-reverse justify-content-end px-3">
            {chatMessages?.map(item => {
              const isSentByMe = userId === item?.profile;
              const fileName = `${item?.attachment?.file_name?.split('/')[1].slice(0, 15)}...`;
              const attachment = item?.attachment;

              return (
                <Box
                  id={`message-${item?.id}`}
                  key={item?.id}
                  className={`d-flex ${
                    isSentByMe ? 'flex-row-reverse ms-auto' : 'flex-row me-auto'
                  } align-items-center gap-2 my-2 mw-75`}
                >
                  <Tooltip title={formatName(item?.first_name, item?.last_name, item?.username)}>
                    <Avatar src={item?.image || ''} alt={item?.first_name} />
                  </Tooltip>

                  <Box
                    className="py-2 px-3"
                    sx={{
                      background: isSentByMe ? '#f6f4f5' : '#ffe3c5',
                      ...activityChatMessageBoxStyles,
                    }}
                  >
                    {attachment ? (
                      <Box
                        className="pointer d-flex align-items-center gap-2"
                        onClick={() => saveAs(attachment?.file)}
                      >
                        <img src={setIconByFileType(attachment?.file)} alt="file-icon" />

                        <Box>
                          <Typography sx={{ fontSize: '11px' }}>{fileName}</Typography>
                          <Typography className="text-muted" sx={{ fontSize: '11px' }}>
                            {formatFileSize(attachment?.file_size)}
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Typography variant="body1">{item?.message}</Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ height: '5px' }} ref={newMsgRef} />
        </Box>
      </Box>

      <Divider light />

      {/* CHAT CONTROL ACTION AREA */}
      <Formik
        initialValues={{ message: '' }}
        validationSchema={activityTabValSchema}
        onSubmit={(values, { resetForm }) => {
          const payload = JSON.stringify({ ...values, workspace: workspaceId });
          socket.send(payload);
          resetForm();
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form>
            <Box className="d-flex align-items-center py-2 px-2">
              {/* EMOJI BOX WITH ICON */}
              <Box className="px-2 position-relative">
                <IconButton onClick={handleToggleEmojiBox}>
                  <SentimentSatisfiedAlt />
                </IconButton>

                {isEmojiBoxOpen && (
                  <Box sx={activityEmojiBoxStyles}>
                    <EmojiPicker
                      skinTonesDisabled
                      onEmojiClick={(data, e) => handleAddEmoji(data, e, values, setFieldValue)}
                      theme={EmojiTheme.AUTO}
                      emojiStyle={EmojiStyle.NATIVE}
                    />
                  </Box>
                )}
              </Box>

              <Box className="col">
                <FormikField
                  placeholder="Start Typing..."
                  name="message"
                  fullWidth
                  className="py-0 px-1 border-0 shadow-none"
                />
              </Box>

              <input onChange={handleAttachFile} ref={inputFileRef} hidden type="file" multiple />

              <Stack direction="row" spacing={1}>
                {isLoading ? (
                  <IconButton>
                    <CircularProgress size={20} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => inputFileRef.current?.click()}>
                    <AttachFile />
                  </IconButton>
                )}

                <IconButton onClick={handleSubmit}>
                  <Send />
                </IconButton>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ActivityTabPanel;
