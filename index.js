const Discord = require('discord.js');
const client = new Discord.Client();

const paceID = process.env.PACE_ID;

// Stored in a sperate file so nobody can mess with the bot
client.login(process.env.DJS_TOKEN);

// When there is a message sent...
client.on('message', msg=> {
    // Look at all the mentions
    msg.mentions.users.array().forEach((user, n) => {
        // See if the ID is Pace's id.
        if(user.id === paceID) {
                    // If so, send "Yo pace!"
        msg.channel.send("Yo pace!");
        }
    });
});