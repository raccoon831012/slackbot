const { RTMClient } = require('@slack/client');
// SNIP: the initialization code shown above is skipped for brevity
// hackathon Bot token
const token = 'xoxb-363129229175-393081732999-E7rOhNWomdPq1CfXuoUG2D0o';

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(token);
rtm.start();


rtm.on('message', (event) => {
  // For structure of `event`, see https://api.slack.com/events/message

  console.log(event)
  message = event

  // Skip messages that are from a bot or my own user ID
  if ( (message.subtype && message.subtype === 'bot_message') ||
       (!message.subtype && message.user === rtm.activeUserId) ) {
    return;
  }

  // Log the message
  console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
});
