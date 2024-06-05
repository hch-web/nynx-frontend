import React, { useMemo } from 'react';
import { Button } from '@mui/material';

function useTransformWorkspaceOptions(workspaces, setIsWorkspaceAvailable) {
  const dataInOption = useMemo(() => {
    const options = workspaces?.map(element => ({
      label: element.title,
      value: element.id,
    }));
    return [
      ...options,
      {
        label: (
          <Button
            variant="contained"
            color="secondary"
            className="px-4 py-2"
            onClick={() => setIsWorkspaceAvailable(false)}
          >
            Create Workspace
          </Button>
        ),
        value: 0,
      },
    ];
  }, [workspaces]);

  return dataInOption;
}
export default useTransformWorkspaceOptions;
