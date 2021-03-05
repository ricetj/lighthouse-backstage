import { Router } from 'express';
import { RouterBuilder } from '.';
import { SlackPluginEnvironment } from '../router';

export const createRouter: RouterBuilder = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options: SlackPluginEnvironment,
): Router => {
  const router = Router();

  router.get('/health', (_, response) => {
    response.send({ status: 'ok' });
  });

  return router;
};
