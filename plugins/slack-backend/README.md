# slack

Welcome to the slack backend plugin!

This plugin provides a backend for configuring backstage to send messages to Slack.

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn
start` in the root directory, and then navigating to [/slack](http://localhost:3000/slack).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](/dev) directory.

## Configuration

This plugin expects the following values be configured in backstage:
- slack.token
- slack.baseUrl
- slack.botId
- slack.channel

Example app-config.yml snippet configured via environment variables:
```
slack:
  token:
    $env: SLACK_TOKEN
  baseUrl:
    $env: SLACK_BASE_URL
  botId:
    $env: SLACK_BOT_ID
  channel:
    $env: SLACK_CHANNEL
```

### Bot

Note the bot requires permissions to post messages in order for the Slack API to allow this plugin to submit messages.

## Endpoints

### GET /health

Returns { status: ok }. At this time, this does not do a health check on the communication to slack, but can be used to check that the plugin is running successfully.

### POST /message

Takes a message body of the format defined in the Slack API documentation. Submits the message to Slack based on the set configuration of the plugin.
