import { publicApi } from '.';

export const authApi = publicApi.injectEndpoints({
  endpoints: build => ({
    loginUser: build.mutation({
      query: body => ({
        url: '/auth/login/',
        method: 'POST',
        body,
      }),
    }),
    forgotPasswordLink: build.mutation({
      query: body => ({
        url: '/auth/forgot/password/',
        method: 'POST',
        body: {
          email: body.email,
        },
      }),
    }),
    resetPassword: build.mutation({
      query: body => ({
        url: '/auth/reset/password/',
        method: 'POST',
        body: {
          activation_key: body.activationKey,
          password: body.password,
        },
      }),
    }),
    registerUser: build.mutation({
      query: body => ({
        url: '/auth/register/',
        method: 'POST',
        body: {
          email: body.email,
          password: body.password,
          username: body.username,
          is_buyer: body.isBuyer,
        },
      }),
    }),
    checkEmailExistence: build.mutation({
      query: body => ({
        url: '/auth/is/email/exists/',
        method: 'POST',
        body: {
          email: body,
        },
      }),
    }),
    isAccountActive: build.mutation({
      query: body => ({
        url: '/auth/is/account/active/',
        method: 'POST',
        body: {
          email: body,
        },
      }),
    }),
    activateAccount: build.query({
      query: id => `/auth/activate/account/${id}`,
    }),
    againActivateAccount: build.mutation({
      query: id => ({
        url: `/auth/activate/account/again/${id}/`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useForgotPasswordLinkMutation,
  useRegisterUserMutation,
  useResetPasswordMutation,
  useCheckEmailExistenceMutation,
  useIsAccountActiveMutation,
  useLazyActivateAccountQuery,
  useAgainActivateAccountMutation
} = authApi;
