import { getVoidLogger } from '@backstage/backend-common';
import { Config } from '@backstage/config';
import express from 'express';
import request from 'supertest';
import { createRouter } from './health.controller';

describe('create router', () => {
  let app: express.Express;

  beforeAll(async () => {
    // We need to define a config object, so we fake it here
    const mockConfig: Config = {} as unknown as Config;

    const router = await createRouter({
      logger: getVoidLogger(),
      config: mockConfig,
    })
    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('GET /health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});