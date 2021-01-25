import {
  alertApiRef,
  createApiFactory,
  errorApiRef,
  ErrorAlerter,
  ErrorApiForwarder
} from '@backstage/core';

export const apis = [
  createApiFactory({
    api: errorApiRef,
    deps: { alertApi: alertApiRef },
    factory: ({ alertApi }) => new ErrorAlerter(alertApi, new ErrorApiForwarder()),
  }),
];
