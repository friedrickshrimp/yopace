const Discord = require('discord.js');
const client = new Discord.Client();

const paceID = process.env.PACE_ID;

// Stored in a sperate file so nobody can mess with the bot
client.login(process.env.DJS_TOKEN);

// When there is a message sent...
client.on('message', msg=> {
    // See if the message includes <@!PACE_ID> because that's how tags work apparently
    if(msg.content.includes("<@!" + paceID + ">")) {
        msg.channel.send("Yo Pace!");
}
});