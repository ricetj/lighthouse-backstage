import { useHotCleanup } from '@backstage/backend-common';
import {
  CatalogBuilder,
  createRouter,
  runPeriodically,
} from '@backstage/plugin-catalog-backend';
import { PluginEnvironment } from '../types';

export default async function createPlugin(env: PluginEnvironment) {
  const builder = new CatalogBuilder(env);
  const {
    entitiesCatalog,
    locationsCatalog,
    higherOrderOperation,
    locationAnalyzer,
  } = await builder.build();

  useHotCleanup(
    module,
    runPeriodically(() => higherOrderOperation.refreshAllLocations(), 100000),
  );

  return await createRouter({
    entitiesCatalog,
    locationsCatalog,
    higherOrderOperation,
    locationAnalyzer,
    logger: env.logger,
  });
}
