const Discord = require('discord.js');
const client = new Discord.Client();

const paceID = process.env.PACE_ID;

// Stored in a sperate file so nobody can mess with the bot
client.login(process.env.DJS_TOKEN);

// When there is a message sent...
client.on('message', async (msg) => {
    if (msg.channel.name != "worship-music"
        && msg.channel.name != "daily-encouragement"
        && msg.channel.name != "accountability"
        && msg.channel.name != "prayer-requests"
        && msg.channel.name != "requesting-help"
        && msg.channel.name != "theology"
        && msg.channel.name != "testimonies") {
        var date = new Date();

        // See if the message includes <@!PACE_ID> because that's how tags work apparently

        if (msg.content.includes("<@!" + paceID + ">") && date.getMonth() == 3 && date.getDate() == 1) {

            if (msg.content.toLowerCase().includes("yo pace") || msg.content.toLowerCase().includes("yo, pace") || msg.content.toLowerCase().includes("yo! pace") || msg.content.toLowerCase().includes("yopace")) {
                const g = "🇬";
                const o = "🅾️";
                const o2 = "🇴";
                const d = "🇩";
                const j = "🇯";
                const o3 = "⭕";
                const b = "🇧";

                msg.react(g);
                msg.react(o);
                msg.react(o2);
                msg.react(d);
                msg.react(j);
                msg.react(o3);
                msg.react(b);
            }

            else {
                const u = "🇺";
                const d = "🇩"
                const i = "🇮";
                const yopace_d = client.emojis.cache.get("826088244818346032");
                const n = "🇳";
                const t = "🇹";
                const s = "🇸";
                const a = "🇦";
                const y = "🇾";
                const yopace_y = client.emojis.cache.get("826088244193656902");
                const o = "🇴";
                const p = "🇵";
                const a2 = "🅰️";
                const c = "🇨";
                const e = "🇪";
                const alarm = client.emojis.cache.get("826095842431205437")


                msg.react(u);
                msg.react(d);
                msg.react(i);
                msg.react(yopace_d);
                msg.react(n);
                msg.react(t);
                msg.react(s);
                msg.react(a);
                msg.react(y);
                msg.react(yopace_y);
                msg.react(o);
                msg.react(p);
                msg.react(a2);
                msg.react(c);
                msg.react(e);
                msg.react(alarm).then((reaction) => {
                    msg.channel.send("Yo Pace!");
                });

            }


        }
        else if(msg.content.includes("<@!" + paceID + ">") || msg.content.includes("<@!802168653797392414>")){
            msg.channel.send("Yo Pace!");
        }
        
        if(msg.content.includes("<@!802168653797392414>") && msg.content.includes("do some stuff.")) {
            var emoji = client.emojis.cache.get("826563972127916092");
            msg.react(emoji);
        }

    }
});
