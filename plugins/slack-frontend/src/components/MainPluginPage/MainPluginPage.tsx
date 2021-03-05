import React from 'react';
import { Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core';
import { MessageForm, SimpleMessageForm } from '..';

export const MainPluginPage = () => (
  <Page themeId="tool">
    <Header title="Slack Frontend Plugin" subtitle="Demoing plugin for the backend slack plugin">
      <HeaderLabel label="Owner" value="VA" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Slack">
        <SupportButton>
          This is a test plugin for demoing the slack backend plugin.
        </SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Send message type 1">
            <MessageForm payload={{ text: 'Hello from Backstage!'}} />
          </InfoCard>
        </Grid>
        <Grid item>
          <InfoCard title="Send message type 2">
            <MessageForm payload={
              {
                blocks: [
                  {
                    type: 'section',
                    text: {
                      type: 'mrkdwn',
                      text: '*Hello from Backstage*',
                    },
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'section',
                    text: {
                      type: 'mrkdwn',
                      text: 'This is a slightly more complex message',
                    },
                  }
                ]
              }
            } />
          </InfoCard>
        </Grid>
        <Grid item>
          <InfoCard title="Send basic message">
            <SimpleMessageForm />
          </InfoCard>
        </Grid>
      </Grid>
    </Content>
  </Page>
);
