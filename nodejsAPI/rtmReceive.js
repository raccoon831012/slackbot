const { RTMClient } = require('@slack/client');

// 先在環境變數設定 Slack bot token
const SLACK_BOT_TOKEN = 'xoxb-363129229175-393081732999-E7rOhNWomdPq1CfXuoUG2D0o'

// 104 hackathon chatbot 的 user id
HACKATHON_BOT_USER_ID = "BAMBCD3FA"

// 積分賽-是非題-頻道
POINT_GAME_TF_CHANNEL_ID = "CAZ2MEA9G"    // point-game-1

// 積分賽-選擇題-頻道
POINT_GAME_MC_CHANNEL_ID = "CAYBKB60G"    // point-game-2

// 積分賽-填空題-頻道
POINT_GAME_BF_CHANNEL_ID = "CB041587R"    // point-game-3

// 決賽-混合題-頻道
FIANL_GAME_CHANNEL_ID = "CAYREHJ7N"     // final-game

// 從 RTM 讀取訊息的延遲時間，單位是秒
RTM_READ_DELAY = 0.1


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
