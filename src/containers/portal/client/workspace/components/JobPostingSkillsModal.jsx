import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Modal,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material';
import propTypes from 'prop-types';
import { Formik, useFormikContext, Form } from 'formik';
import { v4 } from 'uuid';

// API HOOKS
import { useLazyListSubCategoriesQuery, useListCategoriesQuery } from 'services/private/gig/create/overView';

// COMPONENTS
import FormikField from 'shared/components/form/FormikField';
import FormikSelectField from 'shared/components/form/FormikSelectField';
import Chip from 'containers/common/components/Chip';

// STYLES
import {
  jobPostingAddSkillToggleButtonStyles,
  jobPostingSkillModalBoxStyles,
} from 'styles/mui/portal/workspace-styles';
import styles from 'styles/portal/client/job-posting-modal.module.scss';

// UTILITIES
import { PROJECT_BASED, MONTHLY_BASED } from 'utilities/constants';
import { jobPostingSkillsModalSchema } from '../utilities/validationSchema';
import { transformDataToSelectOptions } from '../utilities/helper-functions';
import { jobPostingSkillsFormInitValues } from '../utilities/initialValues';

function JobPostingSkillsModal({ isOpen, handleToggle, selected, setSelected, replaceHelper }) {
  // REFERENCING HOOKS
  const theme = useTheme();

  // STATE HOOKS
  const [categoryOptions, setCategoryOptions] = useState(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState(null);
  const [initValues, setInitValues] = useState(jobPostingSkillsFormInitValues);

  // DESTRUCTURING PROPS
  const { setFieldValue, values } = useFormikContext();

  // API HOOKS
  const { data: categoryData } = useListCategoriesQuery();
  const [getSubCategoriesData] = useLazyListSubCategoriesQuery();

  // TRANSFORMING DATA TO USE IT AS SELECT OPTIONS IN USE EFFECT
  useEffect(() => {
    const transformedCategoryOptions = transformDataToSelectOptions(categoryData);
    setCategoryOptions(transformedCategoryOptions);
  }, [categoryData]);

  useEffect(() => {
    if (selected) {
      const fetchSubCategories = async () => {
        const subCategoriesData = await getSubCategoriesData(selected?.category);
        const transformedSubCategoryOption = transformDataToSelectOptions(subCategoriesData.data);
        setSubCategoryOptions(transformedSubCategoryOption);
      };
      fetchSubCategories();
      setInitValues({
        title: selected?.title || '',
        category: selected?.category || '',
        sub_category: selected?.sub_category || '',
        specializations: selected?.specializations || '',
        budget_type: selected?.budget_type || '',
        budget_amount: selected?.budget_amount || '',
        timeline: selected?.timeline || '',
        categoryLabel: selected?.category_label || '',
        subCategoryLabel: selected?.subcategory_label || ''
      });
    }
  }, [selected]);

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // HANDLER FUNCTIONS
  const handleToggleProjectType = (_, newValue, setCurrentFieldValue) => {
    if (newValue !== null) {
      setCurrentFieldValue('budget_type', newValue);
    }
  };

  const handleDeleteTags = (id, formValues, setValue) => {
    const newTags = [...formValues].filter(value => value.id !== id);
    setValue('specializations', newTags);
  };

  const handleCategoryChange = async value => {
    const subCategoriesData = await getSubCategoriesData(value);

    const transformedSubCategoryOption = transformDataToSelectOptions(subCategoriesData.data);

    setSubCategoryOptions(transformedSubCategoryOption);
  };

  const handleSubCategoryChange = (value, name, selectedOption, setValue) => {
    setValue('subCategoryLabel', selectedOption.label);
  };

  const handleAddTags = (e, formValues, setValue) => {
    const tags = [...formValues, { name: e.target.value, id: v4() }];

    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        e.preventDefault();
        setValue('specializations', tags);
        e.target.value = '';
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={handleToggle}>
      <Box sx={jobPostingSkillModalBoxStyles}>
        <Formik
          enableReinitialize
          initialValues={initValues}
          onSubmit={async (submittedValues, { resetForm }) => {
            const modifiedValues = { ...submittedValues, uId: v4(), is_open: true };
            if (selected) {
              replaceHelper(selected.index, modifiedValues);
              handleToggle();
              setSelected(null);
              setInitValues(jobPostingSkillsFormInitValues);
            } else {
              if (values.skills && values.skills.length > 0) {
                setFieldValue('skills', [...values.skills, modifiedValues]);
              } else {
                setFieldValue('skills', [modifiedValues]);
              }

              handleToggle();
            }

            resetForm();
          }}
          validationSchema={jobPostingSkillsModalSchema}
        >
          {({ setFieldValue: setCurrentFieldValue, values: formValues, errors, touched }) => {
            const timelineField = formValues?.budget_type === PROJECT_BASED ? 'days' : 'months';

            return (
              <Form>
                {/* HEADER */}
                <Box className="d-flex align-items-center justify-content-between px-4 py-3">
                  <Typography variant="h6">Add Skill</Typography>

                  <Stack spacing={2} direction="row">
                    <Button
                      onClick={() => {
                        handleToggle();
                        setInitValues(jobPostingSkillsFormInitValues);
                      }}
                      className="px-4 py-2"
                    >
                      Cancel
                    </Button>

                    <Button type="submit" variant="contained" color="secondary" className="px-4 py-2">
                      Save
                    </Button>
                  </Stack>
                </Box>

                <Divider light />

                {/* FORM BODY */}
                <Box className="d-flex flex-column align-items-start px-4 py-3">
                  {/* CHOOSE SKILL ROW */}
                  <Box className="w-100 my-2">
                    <Typography variant="body2" className="mb-1">
                      Title
                    </Typography>

                    <FormikField name="title" fullWidth />
                  </Box>

                  <Box className="d-flex align-items-start justify-content-between w-100 my-2 gap-3">
                    <Box className="col">
                      <Typography variant="body2" className="mb-1">
                        Category
                      </Typography>

                      <FormikSelectField
                        onChange={handleCategoryChange}
                        options={categoryOptions}
                        name="category"
                        fullWidth
                      />
                    </Box>

                    <Box className="col">
                      <Typography variant="body2" className="mb-1">
                        Sub Category
                      </Typography>

                      <FormikSelectField
                        onChange={(value, name, selectedObject) => handleSubCategoryChange(value, name, selectedObject, setCurrentFieldValue)}
                        options={subCategoryOptions || []}
                        name="sub_category"
                        fullWidth
                      />
                    </Box>
                  </Box>

                  <Box className="w-100 my-2">
                    <Typography variant="body2" className="mb-1">
                      Specialization
                    </Typography>

                    <Box>
                      <input
                        type="text"
                        className={styles.customTextField}
                        style={{
                          borderColor: errors.specializations && touched.specializations ? 'red' : '#e3d6d1',
                        }}
                        onKeyDown={e => handleAddTags(e, formValues?.specializations, setCurrentFieldValue)}
                      />

                      {errors.specializations && touched.specializations && (
                        <Box className="field-error text-danger">{errors.specializations}</Box>
                      )}
                    </Box>

                    <Box className="d-flex align-items-center mt-2">
                      {formValues.specializations?.map(chip => (
                        <Chip
                          key={chip.id}
                          title={chip.name}
                          item={chip}
                          close
                          onClose={item => handleDeleteTags(item?.id, formValues.specializations, setCurrentFieldValue)}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box className="w-100 my-2">
                    <Typography variant="body2" className="mb-1">
                      Choose your Budget
                    </Typography>

                    <ToggleButtonGroup
                      value={formValues.budget_type}
                      exclusive
                      className="d-flex align-items-center justify-content-between gap-3"
                      onChange={(e, newVal) => handleToggleProjectType(e, newVal, setCurrentFieldValue)}
                    >
                      <Card
                        sx={jobPostingAddSkillToggleButtonStyles}
                        component={ToggleButton}
                        value={PROJECT_BASED}
                      >
                        <CardContent>
                          <Typography variant="h6" className="fw-600" color={darkPurple}>
                            Project Budget
                          </Typography>

                          <Typography variant="body2" className="text-muted">
                            You can charge on Project Based
                          </Typography>
                        </CardContent>
                      </Card>

                      <Card
                        sx={jobPostingAddSkillToggleButtonStyles}
                        component={ToggleButton}
                        value={MONTHLY_BASED}
                      >
                        <CardContent>
                          <Typography variant="h6" className="fw-600" color={darkPurple}>
                            Monthly Budget
                          </Typography>

                          <Typography variant="body2" className="text-muted">
                            You can charge on Monthly Based
                          </Typography>
                        </CardContent>
                      </Card>
                    </ToggleButtonGroup>
                  </Box>

                  <Box className="w-100 my-2 d-flex align-items-start gap-3">
                    <Box className="col">
                      <Typography variant="body2">Maximum budget (USD)</Typography>
                      <FormikField type="price" name="budget_amount" fullWidth />
                    </Box>

                    <Box className="col">
                      <Typography variant="body2">Delivery</Typography>
                      <FormikField type={timelineField} name="timeline" fullWidth />
                    </Box>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
}

JobPostingSkillsModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleToggle: propTypes.func.isRequired,
  selected: propTypes.object,
  setSelected: propTypes.func.isRequired,
  replaceHelper: propTypes.func,
};

JobPostingSkillsModal.defaultProps = {
  selected: null,
  replaceHelper: () => {},
};

export default JobPostingSkillsModal;
