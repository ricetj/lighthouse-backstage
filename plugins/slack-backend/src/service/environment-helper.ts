import { Config } from "@backstage/config";
import { SlackConfig } from "./slack-client";

const SLACK_TOKEN_KEY = 'slack.token';
const SLACK_BASE_URL = 'slack.baseUrl';
const SLACK_BOT_ID = 'slack.botId';
const SLACK_CHANNEL = 'slack.channel';

export const createEnvironmentHelper = (config: Config) => ({
  getSlackConfig: (): SlackConfig => ({
    token: config.getString(SLACK_TOKEN_KEY),
    baseurl: config.getString(SLACK_BASE_URL),
    botId: config.getString(SLACK_BOT_ID),
    channel: config.getString(SLACK_CHANNEL),
  })
});
