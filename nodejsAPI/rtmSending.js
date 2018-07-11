const { RTMClient, WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - usually xoxb)
// const token = process.env.SLACK_TOKEN;
// Puggi testBot token
const token = 'xoxb-393545167474-394511672726-YJRB7Xv9KcpudsPvG6dFWZBb';

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(token);
rtm.start();

// Need a web client to find a channel where the app can post a message
const web = new WebClient(token);


// Load the current channels list asynchrously
web.channels.list()
  .then((res) => {
    // Take any channel for which the bot is a member
    const channel = res.channels.find(c => {
        console.log(c)
        return c.is_member
      });

    if (channel) {
      // We now have a channel ID to post a message in!
      // use the `sendMessage()` method to send a simple string to a channel using the channel ID
      rtm.sendMessage('Hello, world!', channel.id)
        // Returns a promise that resolves when the message is sent
        .then((msg) => console.log(`Message sent to channel ${channel.name} with ts:${msg.ts}`))
        .catch(console.error);
    } else {
      console.log('This bot does not belong to any channel, invite it to at least one and try again');
    }
  });
