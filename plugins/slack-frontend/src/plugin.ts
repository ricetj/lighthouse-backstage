import { 
  createApiFactory,
  createPlugin,
  createRouteRef,
  DiscoveryApi,
  discoveryApiRef
} from '@backstage/core';
import { MainPluginPage } from './components';
import { SlackAPI, slackApiRef } from './api';

export const rootRouteRef = createRouteRef({
  path: '/slack-frontend',
  title: 'slack-frontend',
});

export const plugin = createPlugin({
  id: 'slack-frontend',
  apis: [
    createApiFactory({
      api: slackApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }: { discoveryApi: DiscoveryApi }) => (
        new SlackAPI({ discoveryApi })
      )
    })
  ],
  register({ router }) {
    router.addRoute(rootRouteRef, MainPluginPage);
  },
});
