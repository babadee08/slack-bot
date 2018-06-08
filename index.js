const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: process.env.SLACKBOT_TOKEN,
  name: 'AKA-JokeBot'
});

// Start handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  }

  bot.postMessageToChannel('random', 'Get ready to laugh with @AKA-JokeBot', params);
});

// Error handler
bot.on('error', (err) => console.log(err));

// Message handler
bot.on('message', (data) => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

function handleMessage(message) {
  if (message.includes(' chucknorris')) {
    chuckJoke();
  } else if(message.includes(' yomama')) {
    yoMamaJoke();
  } else if(message.includes(' random')) {
    random();
  } else if(message.includes(' help')) {
    runHelp();
  }
}

// tell a Chuck Norris Joke
function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random').then(res => {
      const joke = res.data.value.joke

      const params = {
        icon_emoji: ':laughing:'
      }
    
      bot.postMessageToChannel('random', `Chuck Norris: ${joke}`, params);
    });
}

// tell a yo mama Joke
function yoMamaJoke() {
  axios.get('http://api.yomomma.info').then(res => {
      const joke = res.data.joke

      const params = {
        icon_emoji: ':laughing:'
      }
    
      bot.postMessageToChannel('random', `Yo Momma: ${joke}`, params);
    });
}

// Tell a random joke
function random() {
  const rand = Math.floor(Math.random() * 2) + 1;

  if (rand == 1) {
    chuckJoke();
  } else if (rand == 2) {
    yoMamaJoke();
  } 
}

// show help text
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  }

  bot.postMessageToChannel('random', `Type @AKA-JokeBot with either 'chucknorris', 'yomama' or 'random' to get a Joke`, params);
}