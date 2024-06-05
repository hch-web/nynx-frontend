import { publicApi } from './public';
import { privateApi } from './private';

export const serviceReducers = {
  [publicApi.reducerPath]: publicApi.reducer,
  [privateApi.reducerPath]: privateApi.reducer,
};

export const serviceMiddlewares = [publicApi.middleware, privateApi.middleware];
