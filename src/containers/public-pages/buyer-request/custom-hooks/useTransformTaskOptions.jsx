import React, { useMemo } from 'react';
import { Box, Typography, Chip } from '@mui/material';

// utilities
import { formatTimeline } from 'utilities/helpers';

function useTransformTaskOptions(data) {
  const filteredSubmittedJob = data?.filter(job => !job?.is_offer_sent && !job?.is_closed);

  const dataIntoOptions = useMemo(
    () => filteredSubmittedJob?.map(item => {
      const budgetType = item.budget_type === 'monthly_based' ? 'Monthly' : 'Fixed';

      return {
        label: (
          <Box className="d-flex flex-wrap flex-sm-nowrap align-items-start w-100">
            <Box className="col-12 col-sm-8">
              <Typography variant="body1" className="fw-500">
                I need {item?.subcategory_label}
              </Typography>

              <Box className="d-flex align-items-center gap-3">
                {item?.specializations?.map(chip => (
                  <Chip key={chip?.id} variant="outlined" label={chip?.name} />
                ))}
              </Box>
            </Box>

            <Box className="col-2">
              <Typography variant="body2" className="fw-500">
                {`$${Math.floor(item?.budget_amount)}`}
              </Typography>

              <Typography variant="body2" className="text-muted">
                {budgetType}
              </Typography>
            </Box>

            <Box className="col-2">
              <Typography variant="body2" className="fw-500">
                {formatTimeline(item?.timeline, item?.budget_type)}
              </Typography>

              <Typography variant="body2" className="text-muted">
                Time
              </Typography>
            </Box>
          </Box>
        ),
        value: item?.id,
      };
    }),
    [data]
  );

  return dataIntoOptions;
}

export default useTransformTaskOptions;
