import React, { useEffect } from 'react';
import { Box, Typography, Chip, Button, Stack, Card, Divider } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
// API HOOKS
import { useDeleteJobPostMutation, useListCompleteJobPostsQuery } from 'services/private/jobPost';

// CUSTOM HOOKS
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import useApiServices from 'custom-hooks/useApiServices';

// STYLES
import styles from 'styles/portal/client/workspace-general.module.scss';

// UTILITIES
import { setIconByFileType, formatTimeline, sumArrayElement } from 'utilities/helpers';
import { ADHOC, PROJECT_BASED, MONTHLY } from 'utilities/constants';

// IMAGES
import blankRecordImg from 'assets/jobPostingBlank.png';

// COMPONENTS
import JobPostAccordion from 'containers/portal/common/JobPostAccordion';

// CONSTANTS
const rowClassName = 'd-flex align-items-start justify-content-between my-4 flex-wrap';
const colLeftClassName = 'col-12 col-md-3 col-lg-4 text-center text-md-start mb-2 mb-md-0';
const colRightClassName = 'col-12 col-md-9 col-lg-8 text-center text-md-start';

function JobPosting() {
  // HOOKS REFERENCING
  const { workspaceId } = useParams();
  const { userInfo } = useSelector(state => state.auth);
  const { invalidatePrivateTags } = useApiServices();

  // API HOOKS
  const { data: jobPostData } = useListCompleteJobPostsQuery(workspaceId, { skip: !workspaceId });
  const [deleteJob, { error: deleteJobError, isSuccess: deleteJobSuccess }] = useDeleteJobPostMutation();

  // CUSTOM ERROR HOOKS
  useHandleApiResponse(deleteJobError, deleteJobSuccess, 'Job Post Deleted Successfully!');

  // HANDLER FUNCTIONS
  const handleDeleteJob = async id => {
    await deleteJob(id);
  };

  useEffect(() => {
    invalidatePrivateTags(['GetWorkspace', 'GetFreelancerWorkspace']);
  }, []);

  // constants
  const isBuyer = userInfo?.is_buyer;

  const handleSaveFile = file => {
    saveAs(file);
  };

  return (
    <Box>
      {jobPostData?.length > 0 ? (
        jobPostData?.map((item, idx) => (
          <JobPostAccordion title={`Job Posting#${idx + 1}`} key={item.id} defaultExpanded={idx === 0}>
            <Box className="px-4">
              {/* JOB POSTING TITLE ROW */}
              <Box className={rowClassName}>
                <Typography className={colLeftClassName} variant="label">
                  Job Posting Title
                </Typography>

                <Typography className={`${colRightClassName} fw-600`} variant="body1">
                  {item.title}
                </Typography>
              </Box>

              {/* BUDGET ROW */}
              <Box className={rowClassName}>
                <Typography className={colLeftClassName} variant="label">
                  Budget
                </Typography>

                <Typography className={`${colRightClassName} fw-600`} variant="body1">
                  ${sumArrayElement(jobPostData[idx]?.job_skills, 'budget_amount')}
                </Typography>
              </Box>

              {/* SKILLS ROW */}
              <Box className={rowClassName}>
                <Typography className={colLeftClassName} variant="label">
                  Skills
                </Typography>

                {/* SKILL ITEMS CONTAINER */}
                <Box className={colRightClassName}>
                  {item.job_skills?.map(skill => {
                    const budgetType = skill.budget_type === PROJECT_BASED ? ADHOC : MONTHLY;
                    const budgetAmount = Math.floor(skill.budget_amount, 2);
                    const isOpen = skill.is_open;

                    return (
                      <Card
                        key={skill.id}
                        sx={{ opacity: isOpen ? '1' : '0.6' }}
                        className="py-2 px-4 d-flex align-items-start align-items-xl-center flex-wrap flex-md-nowrap mb-2"
                      >
                        <Box className="col-12 col-md-6 pe-2">
                          <Typography variant="body1" className="text-start fw-600">
                            {skill.title}
                          </Typography>

                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={{ xs: 1, sm: 1, md: 2 }}
                            className="my-2 my-md-0 flex-wrap flex-xl-nowrap"
                          >
                            {skill.specializations?.map(tag => (
                              <Chip key={tag.id} label={tag.name} variant="outlined" />
                            ))}
                          </Stack>
                        </Box>

                        <Box className="col-6 col-sm-4 col-md-3 pe-2 text-center text-sm-start">
                          <Typography variant="body2" className="fw-600 mb-1 mb-md-2">
                            $ {budgetAmount}
                          </Typography>

                          <Typography variant="body2">{budgetType}</Typography>
                        </Box>

                        <Box className="col-6 col-sm-4 col-md-3 pe-2 text-center text-sm-start">
                          <Typography variant="body2" className="fw-600 mb-1 mb-md-2">
                            {formatTimeline(skill?.timeline, skill?.budget_type)}
                          </Typography>

                          <Typography variant="body2">Days</Typography>
                        </Box>
                      </Card>
                    );
                  })}
                </Box>
              </Box>

              {/* DESCRIPTION ROW */}
              <Box className={`${rowClassName} mb-0`}>
                <Typography className={colLeftClassName} variant="label">
                  Description
                </Typography>

                <Box className={colRightClassName}>
                  <Typography variant="body2">{item.description}</Typography>

                  {/* FILES CONTAINER */}
                  <Box className="mt-3 d-flex align-items-center flex-wrap pointer">
                    {item.job_attachment?.map(attachment => {
                      const fileName = `${attachment.file_name.slice(0, 15)}...`;

                      return (
                        <Box
                          className="col col-sm-4 col-md d-flex align-items-start mb-3"
                          key={attachment.id}
                          onClick={() => handleSaveFile(attachment?.file)}
                        >
                          <img
                            className={styles.fileIcon}
                            src={setIconByFileType(attachment.file_type)}
                            alt="file"
                          />

                          <Box>
                            <Typography variant="body2" className="fw-500 w-100">
                              {fileName}
                            </Typography>

                            <Typography variant="body2">{attachment.file_size}</Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider light />

            {/* CARD FOOTER WITH ACTION BUTTONS */}
            {isBuyer && (
              <Box className="px-4 py-3 d-flex align-items-cente justify-content-end gap-3">
                <Button variant="danger" className="py-2 px-4" onClick={() => handleDeleteJob(item.id)}>
                  Inactive Post
                </Button>

                <Button
                  component={Link}
                  to={`/portal/client/workspace/${workspaceId}/job/${item.id}/edit`}
                  variant="contained"
                  color="secondary"
                  className="py-2 px-4"
                >
                  Renew Post
                </Button>
              </Box>
            )}
          </JobPostAccordion>
        ))
      ) : (
        <Box className="d-flex flex-column align-items-center justify-content-center bg-white py-5 px-3">
          <img src={blankRecordImg} alt="infographic" className="mw-100" />

          {userInfo?.is_buyer ? (
            <Box>
              <Box className="col-12 col-sm-8 col-md-6 col-lg-5 text-center my-4">
                <Typography variant="body1">
                  Get started right now by browsing and buying a predefined project!
                </Typography>
              </Box>
              <Button
                component={Link}
                to={`/portal/client/workspace/${workspaceId}/job/create`}
                variant="contained"
                color="secondary"
                className="py-3 px-4"
              >
                Post a Job
              </Button>
            </Box>
          ) : (
            <Box className="mt-4">
              <Typography variant="body1">No Jobs Found1</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default JobPosting;
