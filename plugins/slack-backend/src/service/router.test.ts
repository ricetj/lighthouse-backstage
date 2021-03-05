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
import { Config } from '@backstage/config';
import express from 'express';
import request from 'supertest';
import { createRouter } from './router';

// To unit test this we want to mock our routes, rather than use the real ones
jest.mock('./controllers', () => ({
  routerBuilders: [
    (): express.Router => {
      const router = express.Router();
      router.get('/shire', (_, response) => {
        response.send('hello from the shire');
      });
      return router;
    },
    (): express.Router => {
      const router = express.Router();
      router.get('/mordor', (_, response) => {
        response.send('HELLO from mordor');
      });
      return router;
    }
  ]
}));

describe('createRouter', () => {
  let app: express.Express;

  beforeAll(async () => {
    // We need to define a config object, so we fake it here
    const mockConfig: Config = {} as unknown as Config;

    const router = await createRouter({
      logger: getVoidLogger(),
      config: mockConfig,
    });
    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('router builders are used', () => {
    it('can hit all routes', async () => {
      const hobbitonResponse = await request(app).get('/shire');
      expect(hobbitonResponse.status).toEqual(200);
      expect(hobbitonResponse.text).toBe('hello from the shire');

      const mordorResponse = await request(app).get('/mordor');
      expect(mordorResponse.status).toEqual(200);
      expect(mordorResponse.text).toBe('HELLO from mordor');
    });
  });
});
