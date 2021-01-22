const Discord = require('discord.js');
const client = new Discord.Client();

// Stored in a sperate file so nobody can mess with the bot
client.login(process.env.DJS_TOKEN);

// When there is a message sent...
client.on('message', msg=> {
    // See if the message includes @Pace...
    if(msg.content.includes("@Pace")) {
        // If so, send "Yo pace!"
        msg.channel.send("Yo pace!");
    }
});