import React from 'react';
import { useApi } from '@backstage/core';
import { SlackAPI, slackApiRef } from '../../api';

export interface MessageFormProps {
  payload: Record<string, unknown>
}

export const MessageForm = (props: MessageFormProps): JSX.Element => {
  const { payload } = props;
  const stringifiedPayload = JSON.stringify(payload, null, 2);
  const slackApi = useApi<SlackAPI>(slackApiRef);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const success = await slackApi.post(payload);
      if (!success) {
        alert('Failed to send data to slack');
      }
    } catch (error: unknown) {
      alert(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Message Payload</h3>
        <pre>
          <p>{ stringifiedPayload }</p>
        </pre>
        <button>Send Message</button>
      </form>
    </>
  );
};