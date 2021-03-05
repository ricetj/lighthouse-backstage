import { createApiRef, DiscoveryApi } from "@backstage/core";
import { SlackMessageBody } from "@internal/plugin-slack-backend/src/service/slack-client";

interface SlackAPIProps {
  discoveryApi: DiscoveryApi;
}

export const slackApiRef = createApiRef<SlackAPI>({
  // Not sure if this id is arbitrary or whether it should technically point
  // to the frontend or backend
  id: 'plugin.slack-backend.service',
  description: "Used to make requests to slack API"
});

export class SlackAPI {
  public discoveryApi: DiscoveryApi;

  constructor({discoveryApi}: SlackAPIProps) {
    this.discoveryApi = discoveryApi;
  }

  private async getBaseUrl(): Promise<string> {
    const base = await this.discoveryApi.getBaseUrl('slack');
    return base;
  }

  async post(message: SlackMessageBody): Promise<boolean> {
    try {
      const baseUrl = await this.getBaseUrl();
      const response = await fetch(
        `${baseUrl}/message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(message)
        }
      );

      const json = await response.json() as { status: string }
      if (json.status === 'ok') {
        return true;
      }

      return false;
    } catch (error: unknown) {
      throw error;
    }
  }
}