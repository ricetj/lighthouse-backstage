/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getVoidLogger } from '@backstage/backend-common';
import { ConfigReader } from '@backstage/config';
import express from 'express';
import request from 'supertest';
import { createRouter } from './router';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('createRouter', () => {
  let app: express.Express;

  beforeAll(async () => {
    const configReader = new ConfigReader(
      {
        slack: {
          token: 'asd',
          baseUrl: 'https://test-things-out:5555',
          botId: 'asd',
          channel: 'asd'
        }
      }
    );

    const router = await createRouter({
      logger: getVoidLogger(),
      config: configReader,
    });
    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /heatlh', () => {
    it ('returns ok', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ok' });
    })
  });

  describe('POST /message', () => {
    const worker = setupServer(rest.post('https://test-things-out:5555/api/chat.postMessage', (_, res, ctx) => (
      res(
        ctx.status(200),
        ctx.json({
          ok: true,
          message: 'hello there'
        })
      )
    )));

    beforeAll(() => {
      worker.listen();
    })

    afterAll(() => {
      worker.close();
    });
    
    it ('returns ok', async () => {
      const response = await request(app).post('/message');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ok' });
    })
  });
});
