import {
  alertApiRef,
  createApiFactory,
  errorApiRef,
  ErrorAlerter,
  ErrorApiForwarder
} from '@backstage/core';
import { MockSentryApi, sentryApiRef } from '@backstage/plugin-sentry';

export const apis = [
  createApiFactory({
    api: errorApiRef,
    deps: { alertApi: alertApiRef },
    factory: ({ alertApi }) => new ErrorAlerter(alertApi, new ErrorApiForwarder()),
  }),
  createApiFactory(sentryApiRef, new MockSentryApi()),
];
