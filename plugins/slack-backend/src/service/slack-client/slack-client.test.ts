import { createSlackClient, SlackClient, SlackConfig } from './slack-client';

describe('create slack client', () => {
  const testSlackConfig: SlackConfig = {
    token: 'asd',
    baseurl: 'asd',
    botId: 'my-bot',
    channel: 'my-channel'
  };

  const slackClient: SlackClient = createSlackClient(testSlackConfig);

  it('has post message function', () => {
    expect(slackClient.postMessage).toBeDefined();
  });

  describe('post message', () => {
    // TODO: Configure a mock web server

    // TODO: Implement
    it('returns ok when message delivery was successful', () => {
      expect(true).toBeTruthy();
    });

    // TODO: Implement
    it('returns 500 when message delivery was unsuccessful', () => {
      expect(true).toBeTruthy();
    });
  });
});
