const request = require('request');
const xml = require('xml2js');
const  DiscordJS = require('discord.js');

const client = new DiscordJS.Client({ intents: [DiscordJS.Intents.FLAGS.GUILDS, DiscordJS.Intents.FLAGS.GUILD_MESSAGES] });
const mwkey = process.env.MW_KEY;
const paceID = process.env.PACE_ID;

// Stored in a sperate file so nobody can mess with the bot
client.login(process.env.DJS_TOKEN);


client.on('ready', async () => {
    //FC
    const guild = client.guilds.cache.get('721442403919331409');
    var commands;
    if (guild) {
        commands = guild.commands;
    }
    else {
        commands = client.application?.commands;
    }

    commands?.create({
        name: "define",
        description: "Defines a keyword according to the MW dictionary",
        options : [{
            name: 'word',
            description : 'The word to look up',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
        },
    {
        name: "ephemeral",
        description: "Whether or not you want the result to be only visible to you. Defaults to false",
        required: false,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.BOOLEAN
    }
    ]
    });
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName, options } = interaction;

    if (commandName === "define") {
        var ephemeralvar;
        if(options.getBoolean("ephemeral")) {
            ephemeralvar = options.getBoolean("ephemeral");
        }
        else {
            ephemeralvar = false;
        }
        var word = options.getString("word").trim();

        if(word === "stupid" || word === "headache") {
            interaction.reply({
                content: "This bot.",
                ephemeral: ephemeralvar
            });
            return;
        }
        
          if(word === "loved") {
            interaction.reply({
                content: "See the definition of \'loved\' below: \n \n You. God loves you. His love never fails.",
                ephemeral: ephemeralvar
            });
            return;
        }
        
        getDefinition(word, (result, e) => {


            if (result != undefined && result[0].definition != undefined) {

                var deflist = ""
                for (var i = 0; i < result.length; i++) {
                    deflist += "\n \n" + (i + 1).toString() + ". " + word + " [" + result[i].partOfSpeech + "] : \n" + result[i].definition.replace(/:/g, " > ");
                }
                deflist.trim();
                if(deflist.length > 1800) {
                    deflist = deflist.substring(0, 1800) + "..."
                }
                



                interaction.reply({
                    content: "See definition for ***" + word  +  "*** below: " + deflist + "\n\n see more at https://www.merriam-webster.com/dictionary/" + word,
                    ephemeral: ephemeralvar
                })
            }
            else {
                interaction.reply({
                    content: "Can't find that word in the dictionary.",
                    ephemeral: true
                })
            }
        });
    }


});
// When there is a message sent...
client.on('message', async (msg) => {

    // See if the message includes <@!PACE_ID> because that's how tags work apparently
    if (msg.content.includes("<@!" + paceID + ">") && msg.channel.name != "worship-music"
        && msg.channel.name != "daily-encouragement"
        && msg.channel.name != "accountability"
        && msg.channel.name != "prayer-requests"
        && msg.channel.name != "requesting-help"
        && msg.channel.name != "theology"
        && msg.channel.name != "testimonies"
        && msg.channel.name != "bible-study-chat") {
        msg.channel.send("Yo Pace!");
    }


});


function getDefinition(word, callback) {
    raw(word, function (result, error) {
        if (error === null) {


            let results = [];

            if (result.entry_list.entry != undefined) {
                let entries = result.entry_list.entry;
                for (var i = 0; i < entries.length; i++) {

                    //remove erroneous results (doodle != Yankee Doodle)
                    if (entries[i].ew == word) {

                        //construct a more digestable object
                        const definition = entries[i].def[0].dt;
                        const partOfSpeech = entries[i].fl;

                        results.push({
                            partOfSpeech: entries[i].fl,
                            definition: entries[i].def[0].dt.map(entry => {
                                console.log(entry);
                                if (typeof (entry) === 'string') {
                                    return entry;
                                }

                                if (entry['_']) {
                                    return entry['_'];
                                }
                            }).join('\n')
                        });
                    }
                }

                callback(results.filter(entry => entry.definition), null);
            }
            else if (result.entry_list.suggestion != undefined) {
                callback('suggestions', result.entry_list.suggestion);
            }

        }
        else callback(null, error);

    });

}

function raw(word, callback) {

    const MW_ROOT = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/';

    var url = MW_ROOT + word + '?key=' + mwkey;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            xml.parseString(body, function (error, result) {
                if (error === null) callback(result, null);
                else if (response.statusCode != 200) console.log(response.statusCode);
                else {
                    console.log(error);
                    console.log('url: ' + url);
                    console.log('body: ' + body);
                    callback(null, 'XML Parsing error.');
                }
            });
        }
        else callback(null, 'API connection error.')
    });
}
