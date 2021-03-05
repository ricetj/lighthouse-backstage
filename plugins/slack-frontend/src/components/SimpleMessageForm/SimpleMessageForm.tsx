import React from 'react';
import { useApi } from '@backstage/core';
import { SlackAPI, slackApiRef } from '../../api';

export const SimpleMessageForm = (): JSX.Element => {
  const [ text, setText ] = React.useState('');
  const slackApi = useApi<SlackAPI>(slackApiRef);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // TODO: This is insecure because we have no data santizing. This is only
      // for demoing purposes.
      const success = await slackApi.post({ text });
      if (!success) {
        alert('Failed to send data to slack');
      }
    } catch (error: unknown) {
      alert(error);
    }
  };

  const handleButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Message Content</label>
          <input
            type="text"
            id="content"
            value={text}
            placeholder="Write a message..."
            onChange={handleButtonChange}  
          />
        </div>
        <button>Send Message</button>
      </form>
    </>
  );
};