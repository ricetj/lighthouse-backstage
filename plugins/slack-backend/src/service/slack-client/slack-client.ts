import axios from 'axios';

export interface SlackConfig {
  token: string,
  baseurl: string,
  botId: string,
  channel: string
}

export interface SlackClient {
  postMessage: (payloadData: SlackMessageBody) => Promise<Record<string, unknown>>
};

export interface SlackMessageBody {
  text?: string
}

export const createSlackClient = (config: SlackConfig): SlackClient => {
  const paths = {
    postMessage: '/api/chat.postMessage'
  }
  const axiosClient = axios.create({
    baseURL: config.baseurl,
    headers: {
      'Authorization': `Bearer ${config.token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  const defaultPayloadFields = {
    channel: config.channel,
    bot: config.botId,
  };

  // Functions
  const postMessage = async (
    payloadData: SlackMessageBody,
  ): Promise<Record<string, unknown>> => {
    try {
      const response = await axiosClient.post(
        paths.postMessage,
        {
        ...defaultPayloadFields,
        ...payloadData,
        },
      );
      return response.data;
    } catch (error: unknown) {
      return Promise.reject(error);
    }
  };

  return {
    postMessage,
  }
}


