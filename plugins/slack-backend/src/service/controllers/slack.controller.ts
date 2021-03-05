import { Router as ExpressRouter } from 'express';
import Router from 'express-promise-router';
import { RouterBuilder } from '.';
import { createEnvironmentHelper } from '../environment-helper';
import { SlackPluginEnvironment } from '../router';
import {
  createSlackClient,
  SlackClient,
  SlackMessageBody
} from '../slack-client';

export const createRouter: RouterBuilder = (
  options: SlackPluginEnvironment,
): ExpressRouter => {
  const { config } = options;
  const environmentHelper = createEnvironmentHelper(config);

  const slackClient: SlackClient = createSlackClient(
    environmentHelper.getSlackConfig()
  );

  const router = Router();
  router.post('/message', async (request, response) => {
    // For now we'll assume the payload is in the proper format
    const messageBody = request.body as SlackMessageBody;
    const responseData = await slackClient.postMessage(messageBody);

    if (responseData.ok) {
      response.send({ status: 'ok' });
    } else {
      response.status(500);
      response.send({ status: 'error' });
    }
  });

  return router;
};
