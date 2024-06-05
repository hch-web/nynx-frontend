import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Button, Stack, Card, Divider } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { saveAs } from 'file-saver';

// API HOOKS & CUSTOM HOOKS
import { useCloseJobPostMutation, useListCompleteJobPostsQuery } from 'services/private/jobPost';
import { useUpdateProposalSkillMutation } from 'services/private/workspace/freelancers';
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import useApiServices from 'custom-hooks/useApiServices';

// COMPONENTS & STYLES & UTILITIES & IMAGES
import SectionLoader from 'containers/common/loaders/SectionLoader';
import styles from 'styles/portal/client/workspace-general.module.scss';
import { formatTimeline, setIconByFileType, sumArrayElement } from 'utilities/helpers';
import { DEACTIVATE, PROJECT_BASED } from 'utilities/constants';
import blankRecordImg from 'assets/jobPostingBlank.png';
import JobPostAccordion from '../../common/JobPostAccordion';
import UpdateSkillModal from '../UpdateSkillModal';
import { allSkillsAreDeactivated } from '../../utilities/helper-functions';

// CONSTANTS
const rowClassName = 'd-flex align-items-start justify-content-between my-4 flex-wrap';
const colLeftClassName = 'col-12 col-md-3 col-lg-4 text-center text-md-start mb-2 mb-md-0';
const colRightClassName = 'col-12 col-md-9 col-lg-8 text-center text-md-start responsive-text';

function JobPosting() {
  // HOOKS REFERENCING
  const { workspaceId } = useParams();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(null);
  const { invalidatePrivateTags } = useApiServices();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // API HOOKS & CUSTOM HOOKS
  const { data: jobPostData, isLoading } = useListCompleteJobPostsQuery(workspaceId, { skip: !workspaceId });
  const [updateProposalSkill, { error, isSuccess }] = useUpdateProposalSkillMutation();
  const [closeJobPost] = useCloseJobPostMutation();
  useHandleApiResponse(error, isSuccess, 'Skill has been Inactivated');

  useEffect(() => {
    invalidatePrivateTags(['GetWorkspace']);
  }, []);

  const handleUpdateSkillStatus = async (id, jobSkills) => {
    const payload = { id, is_closed: true };
    const inactiveSkills = jobSkills?.filter(skill => skill?.is_closed === true);

    await updateProposalSkill(payload);

    if (inactiveSkills?.length === jobSkills.length - 1) {
      await closeJobPost(jobPostData[0]?.id);
    }
  };

  const handleEditSkill = item => {
    setSelectedSkill(item);
    setIsSkillModalOpen(true);
  };

  const handleToggleSkillModal = () => {
    setIsSkillModalOpen(!isSkillModalOpen);
  };

  const handleNavigateToRenewJobPost = job => {
    if (allSkillsAreDeactivated(job?.job_skills)) {
      navigate('/portal/client/workspace/job/create', {
        state: {
          workspaceDetail: {
            workspaceId,
            title: job?.title,
          },
        },
      });
    } else {
      enqueueSnackbar('To renew a job, all skills must be inactive', { variant: 'error' });
    }
  };

  const handleSaveFile = file => {
    saveAs(file);
  };

  return (
    <Box>
      {!isLoading ? (
        <Box>
          {jobPostData?.length > 0 ? (
            jobPostData?.map((item, idx) => {
              const isDeactivated = item?.status === DEACTIVATE;
              // const isJobClosed = item?.is_closed;

              return (
                <JobPostAccordion
                  title={`Job Posting#${idx + 1}`}
                  key={item.id}
                  defaultExpanded={!item?.is_closed}
                >
                  <Box className="px-4" sx={{ opacity: isDeactivated ? 0.5 : 1 }}>
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
                          const budgetType = skill.budget_type === PROJECT_BASED ? 'Adhoc' : 'Monthly';
                          const budgetAmount = `$${Math.floor(skill.budget_amount, 2)}`;
                          const isOpen = skill.is_open;
                          const isClose = skill?.is_closed;

                          return (
                            <Card
                              key={skill.id}
                              sx={{ opacity: isOpen ? '1' : '0.6' }}
                              className="py-2 px-4 d-flex align-items-start align-items-xl-center flex-wrap flex-md-nowrap mb-2"
                            >
                              <Box className="col-12 col-md-5 pe-2">
                                <Typography variant="body1" className="fw-600">
                                  {`I need an expert of ${skill?.subcategory_label}`}
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

                              <Box className="col-6 col-sm-4 col-md-2 pe-2 text-center text-sm-start">
                                <Typography variant="body2" className="fw-600 mb-1 mb-md-2">
                                  {budgetAmount}
                                </Typography>

                                <Typography variant="body2">{budgetType}</Typography>
                              </Box>

                              <Box className="col-6 col-sm-4 col-md-2 pe-2 text-center text-sm-start">
                                <Typography variant="body2" className="fw-600 mb-1 mb-md-2">
                                  {formatTimeline(skill.timeline, skill.budget_type)}
                                </Typography>

                                <Typography variant="body2">Time</Typography>
                              </Box>

                              <Box className="col-12 col-sm-auto col-md-3 ms-0 ms-sm-auto ms-md-0 text-center text-sm-start mt-2 mt-sm-0 d-flex gap-2">
                                <Button
                                  variant="success"
                                  disabled={isClose}
                                  onClick={() => handleEditSkill(skill)}
                                >
                                  Update
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => handleUpdateSkillStatus(skill?.id, item?.job_skills)}
                                  disabled={isClose}
                                >
                                  {isClose ? 'Inactivated' : 'Inactive'}
                                </Button>
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
                        <Box className="mt-3 d-flex align-items-center flex-wrap">
                          {item.job_attachment?.map(attachment => {
                            const fileName = `${attachment.file_name.slice(0, 15)}...`;
                            return (
                              <Box
                                className="col col-sm-4 col-md d-flex align-items-start mb-3 pointer"
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
                  <Box className="px-4 py-3 d-flex align-items-cente justify-content-end gap-3">
                    <Button
                      variant="contained"
                      color="secondary"
                      className="py-2 px-4"
                      onClick={() => handleNavigateToRenewJobPost(item)}
                      disabled={!allSkillsAreDeactivated(item?.job_skills)}
                    >
                      Renew Post
                    </Button>
                  </Box>
                </JobPostAccordion>
              );
            })
          ) : (
            <Box className="d-flex flex-column align-items-center justify-content-center bg-white py-5 px-3">
              <img src={blankRecordImg} alt="infographic" className="mw-100" />

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
          )}
        </Box>
      ) : (
        <Box className="my-5 py-5">
          <SectionLoader />
        </Box>
      )}
      <UpdateSkillModal
        isOpen={isSkillModalOpen}
        handleToggle={handleToggleSkillModal}
        selected={selectedSkill}
      />
    </Box>
  );
}

export default JobPosting;
