import { todoPlugin } from '@backstage/plugin-todo';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';

export default async function createPlugin({
  logger,
  config,
  database,
  reader,
}: PluginEnvironment): Promise<Router> {
  const todos = new todoPlugin();

  return await {
    logger,
    config,
    database,
    reader,
    todos
  };
}
