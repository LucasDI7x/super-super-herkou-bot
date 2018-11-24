const Discord = require('discord.js');
const bot = new Discord.Client();

let channels = {};

bot.on('message', (message) => {
  if (message.content.toLowerCase() === '/matches stop') {
    console
    if (channels[message.channel.id]) {
      if (channels[message.channel.id] !== null) {
        clearInterval(channels[message.channel.id].interval);
      }
      channels[message.channel.id] = {
        players: {},
        interval: null,
      };
    }
  }
  
});

bot.on('message', (message) => {
  if (message.content.toLowerCase() === '/matches start') {
    if (!channels[message.channel.id]) {
      channels[message.channel.id] = {
        players: {},
        interval: null,
      };
    }
    if (channels[message.channel.id].interval !== null) {
      clearInterval(channels[message.channel.id].interval);
    }
    channels[message.channel.id].interval = setInterval(() => {
      message.channel.send(generateEmbed(message.channel.id));
    }, 70000);

  }
});

function generateEmbed(channelId) {
  if (channels[channelId]) {
    const matches = Object.values(channels[channelId].players).reduce((matches, player) => {
      if (!matches[player.match]) {
        matches[player.match] = [];
      }
      matches[player.match].push(player);
      return matches;
    }, {});
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle('Matches')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription('A List of Matches');
    Object.keys(matches).map(matchId => {
      const matchUsers = [];
      matches[matchId].forEach(player => {
        matchUsers.push(`${player.user}`);
      });
      embed.addField(matchId, matchUsers.join('\n'), true);
    });
    return embed;
  } else {
    return 'No Matches';
  }
}

bot.on('message', (message) => {
  if (message.content.toLowerCase() === '/matches') {
    if (channels[message.channel.id]) {
      message.channel.send(generateEmbed(message.channel.id));
    } else {
      message.reply('Matches not active for this channel, run /matches start');
    }
  }
});

bot.on('message', (message) => {
  if (channels[message.channel.id]) {
    if (message.content.length === 3) {
      const match = message.content;
      let player = channels[message.channel.id].players[message.author.id];
      if (!player) {
        player = {
          user: message.author,
        };
      }
      player.match = match;
      channels[message.channel.id].players[message.author.id] = player;
    }
  }
});

bot.on('message', function(message){
    if(message.content == '!scrims')
    {
        message.reply(
          {
            "content": "Scrim match:",
            "embed": {
              "title": "A scrim match is starting, Listen for the countdown!",
             
              "color": 1555008,
              "timestamp": "2018-11-18T16:31:26.256Z",
              "footer": {
                "icon_url": "https://lh5.googleusercontent.com/-v5Nzhy71M-I/AAAAAAAAAAI/AAAAAAAAABg/XNFbi914Nkw/photo.jpg",
                "text": "footer text"
              },
              "thumbnail": {
                "url": "https://lh5.googleusercontent.com/-v5Nzhy71M-I/AAAAAAAAAAI/AAAAAAAAABg/XNFbi914Nkw/photo.jpg"
              },
              "image": {
                "url": ""
              },
              "author": {
                "name": "Impact Scrims",
               
                "icon_url": "https://lh5.googleusercontent.com/-v5Nzhy71M-I/AAAAAAAAAAI/AAAAAAAAABg/XNFbi914Nkw/photo.jpg"
              },
              "fields": [
                {
                  "name": "Alert -",
                  "value": "A scrim match is starting soon!"
                },
                {
                  "name": "What to do?",
                  "value": "We will do a countdown from 3 secs, Ready up on go."
                },
                {
                  "name": "When?",
                  "value": "These scrim games happen every half an hour."
                },
                  
                {
                  "name":"Good luck!",
                  "value": "That's mostly self-explantory.",
                  "inline": true
                }
              ]
            }
          }
        )
    }

      

});
  


bot.login('NTE1NTgzNzkxMzkwMTMwMTc3.DtnTcA.a_W6QgZM2cC3uvVwlV_MSCk3nro') // PASTE TOKEN HERE
client.login(process.env.BOT_TOKEN);
