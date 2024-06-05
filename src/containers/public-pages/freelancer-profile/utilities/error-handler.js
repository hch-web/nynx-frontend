import { isBadRequest, isUnexpectedError } from 'shared/helpers/utility-functions';

// eslint-disable-next-line import/prefer-default-export
export const errorHandler = resp => {
  if ('error' in resp) {
    if (isBadRequest(resp.error)) {
      return [resp.error.data.non_field_errors[0], { variant: 'error' }];
    }

    if (isUnexpectedError(resp.error)) {
      return ['Something Went Wrong!', { variant: 'error' }];
    }

    if ('data' in resp.error && resp.error?.originalStatus === 500) {
      return ['Something Went Wrong!', { variant: 'error' }];
    }
  }

  // console.log(resp?.error);

  return ['Created Successfully!', { variant: 'success' }];
};
