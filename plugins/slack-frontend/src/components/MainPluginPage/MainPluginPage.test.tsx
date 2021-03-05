import React from 'react';
import { render } from '@testing-library/react';
import { MainPluginPage } from './MainPluginPage';
import { ThemeProvider } from '@material-ui/core';
import { lightTheme } from '@backstage/theme';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { msw } from '@backstage/test-utils';
import { ApiProvider, ApiRegistry, UrlPatternDiscovery } from '@backstage/core';
import { SlackAPI, slackApiRef } from '../../api';

const discoveryApi = UrlPatternDiscovery.compile('http://exampleapi.com');

const apis = ApiRegistry.from([
  [slackApiRef, new SlackAPI({ discoveryApi })],
]);

describe('MainPluginpage', () => {
  
  const server = setupServer();
  // Enable sane handlers for network requests
  msw.setupDefaultHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))))
  })

  it('should render', () => {
    const rendered = render(
      <ApiProvider apis={apis}>
        <ThemeProvider theme={lightTheme}>
          <MainPluginPage />
        </ThemeProvider>
      </ApiProvider>
      );
      expect(rendered.getByText('Slack Frontend Plugin')).toBeInTheDocument();
  });
});
