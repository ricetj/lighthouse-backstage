import { Router } from 'express';
import { SlackPluginEnvironment } from '../router';
import { createRouter as createHealthRouter } from './health.controller';
import { createRouter as createSlackRouter } from './slack.controller';

export type RouterBuilder = (options: SlackPluginEnvironment) => Router;

export const routerBuilders: RouterBuilder[] = [
  createHealthRouter,
  createSlackRouter,
];
