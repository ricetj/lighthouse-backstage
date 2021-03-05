import { getVoidLogger } from '@backstage/backend-common';
import { Config } from '@backstage/config';
import express from 'express';
import request from 'supertest';
import { SlackClient } from '../slack-client';
import { createRouter } from './slack.controller';

jest.mock('../slack-client/slack-client', () => {
  const createSlackClient = (): SlackClient => {
    const postMessage = (): Promise<Record<string, unknown>> => {
      return Promise.resolve({
        ok: true
      });
    }

    return {
      postMessage
    };
  };

  return {
    createSlackClient
  };
});

describe('create router', () => {
  let app: express.Express;

  beforeAll(async () => {
    // We need to define a config object, so we fake it here
    const mockConfig: Config = {
      getString: (key: string) => key
    } as unknown as Config;

    const router = await createRouter({
      logger: getVoidLogger(),
      config: mockConfig,
    })
    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('POST /message', async () => {
    const response = await request(app).post('/message');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});