const { RTMClient } = require('@slack/client');

// 先在環境變數設定 Slack bot token
const SLACK_BOT_TOKEN = 'xoxb-363129229175-393081732999-E7rOhNWomdPq1CfXuoUG2D0o'

// 104 hackathon chatbot 的 user id
HACKATHON_BOT_USER_ID = "BBJT1T5B8"

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

const rtm = new RTMClient(SLACK_BOT_TOKEN);


function parseBotEvents(slackEvent) {
  // 只回應 bot 的訊息
  if ( slackEvent.type === 'message' && slackEvent.subtype === 'bot_message') {
    return { message: slackEvent.text, channel: slackEvent.channel };
  } else {
    return false;
  }
}

function handle_message(message, channel) {
  // console.log(message)
  if (!message.includes('Question')) {
    return false;
  }

  let questionId, questionType, questionFrom, questionScore, answerLength, question;

  messageSplit = message.split('\n')
  for(let str of messageSplit) {
    str = str.trim()
    // console.log(str)
    if(str.startsWith('Id:')) {
      questionId = str.split('Id:')[1].trim()
    } else if (str.startsWith('Type:')) {
      questionType = str.split('Type:')[1].trim()
    } else if (str.startsWith('From:')) {
      questionFrom = str.split('From:')[1].trim()
    } else if (str.startsWith('Score:')) {
      questionScore = str.split('Score:')[1].trim()
    } else if (str.startsWith('Length:')) {
      answerLength = str.split('Length:')[1].trim()
    }
  }
  // 取得題目內容
  if (message.includes('Question:'))
    question = message.split("Question:")[1].trim()

  console.log(questionType)
  // console.log(question)
  // 這裡是回答
  
}

function main() {
  rtm.start();
  rtm.on('message', (event) => {
    // console.log(event)
    const res = parseBotEvents(event)
    // console.log(res)
    let message = res.message
    let channel = res.channel
    // console.log(message)
    if (message !== undefined) {
      handle_message(message, channel)
    }
  })

}

main();
