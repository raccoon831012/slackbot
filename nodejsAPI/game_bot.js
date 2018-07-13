const { RTMClient, WebClient } = require('@slack/client');

// 先在環境變數設定 Slack bot token
// SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN
SLACK_BOT_TOKEN = 'xoxb-363129229175-393081732999-E7rOhNWomdPq1CfXuoUG2D0o'

// 104 hackathon chatbot 的 user id
HACKATHON_BOT_USER_ID = 'UANUQ2XCN'

// 積分賽-是非題-頻道
POINT_GAME_TF_CHANNEL_ID = 'CAZ2MEA9G'    // point-game-1

// 積分賽-選擇題-頻道
POINT_GAME_MC_CHANNEL_ID = 'CAYBKB60G'    // point-game-2

// 積分賽-填空題-頻道
POINT_GAME_BF_CHANNEL_ID = 'CB041587R'    // point-game-3

// 決賽-混合題-頻道
FIANL_GAME_CHANNEL_ID = 'CAYREHJ7N'     // final-game

// 從 RTM 讀取訊息的延遲時間，單位是秒
RTM_READ_DELAY = 0.1

const rtm = new RTMClient(SLACK_BOT_TOKEN);
const web = new WebClient(SLACK_BOT_TOKEN);

function parseBotEvents(slackEvent) {
  // 只回應 bot 的訊息
  if ( slackEvent.type === 'message' && slackEvent.subtype === 'bot_message') {
    return { message: slackEvent.text, channel: slackEvent.channel };
  } else {
    return false;
  }
}

function sendPrivateMessage(userId, channelId, response) {
  web.chat.postEphemeral({ channel: channelId, user: userId, text: response })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('postEphemeral sent: ', res.ok);
  })
  .catch(console.error);
}

function sendPublicMessage(channelId, response) {
  web.chat.postMessage({ channel: channelId, text: response })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('postMessage sent: ', res);
  })
  .catch(console.error);
}

function trueFalseQuestion(questionId, questionType, questionFrom, questionScore, question) {
  let answer = 'O'
  let response = 'Id: ' + questionId + '\n'
  response += 'Answer: ' + answer
  return response;
}

function multipleChoiceQuestion(questionId, questionType, questionFrom, questionScore, question) {
  let answer = '1'
  let response = 'Id: ' + questionId + '\n'
  response += 'Answer: ' + answer
  return response;
}

function blankFillingQuestion(questionId, questionType, questionFrom, questionScore, answerLength, question) {
  let answer = '三十年'
  let response = 'Id: ' + questionId + '\n'
  response += 'Answer: ' + answer
  return response;
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
    question = message.split('Question:')[1].trim()

  console.log(questionType)
  // console.log(question)
  // 這裡是回答
  let response;
  if (questionType === '是非題') {
    response = trueFalseQuestion(questionId, questionType, questionFrom, questionScore, question)
  } else if (questionType === '選擇題') {
    response = multipleChoiceQuestion(questionId, questionType, questionFrom, questionScore, question)
  } else if (questionType === '填空題') {
    response = blankFillingQuestion(questionId, questionType, questionFrom, questionScore, answerLength, question)
  }
  // 確認目前是哪個賽程
  if (channel === FIANL_GAME_CHANNEL_ID){
    sendPublicMessage(channel, response)    // 決賽直接回在頻道裡
  } else {
    sendPrivateMessage(HACKATHON_BOT_USER_ID, channel, response)    // 積分賽回私訊
  }
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
