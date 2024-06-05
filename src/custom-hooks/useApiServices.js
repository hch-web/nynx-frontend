import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { privateApi } from 'services/private';
import { publicApi } from 'services/public';

function useApiServices() {
  const dispatch = useDispatch();

  const invalidatePrivateTags = useCallback(
    tags => {
      dispatch(privateApi.util.invalidateTags(tags));
    },
    []
  );

  const invalidatePublicTags = useCallback(tags => {
    dispatch(publicApi.util.invalidateTags(tags));
  }, []);

  return {
    invalidatePrivateTags,
    invalidatePublicTags,
  };
}

export default useApiServices;
