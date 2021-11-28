const Discord = require('discord.js');
const request = require('request');
const xml     = require('xml2js');
const client = new Discord.Client();
const mwkey = process.env.MW_KEY;
const paceID = process.env.PACE_ID;

// Stored in a sperate file so nobody can mess with the bot
client.login(process.env.DJS_TOKEN);


client.on('ready', () => {
const guild = client.guilds.cache.get(721442403919331409);
var commands;
     if(guild) {
          commands = guild.commands;
     }
     else {
     commands = client.application?.commands;
     }
     
commands?.create({
name: "define",
     description: "Defines a keyword according to the MW dictionary"
});
});
// When there is a message sent...
client.on('message', async (msg) => {

     // See if the message includes <@!PACE_ID> because that's how tags work apparently
     if(msg.content.includes("<@!" + paceID + ">") && msg.channel.name != "worship-music"
     && msg.channel.name != "daily-encouragement"
     && msg.channel.name != "accountability"
     && msg.channel.name != "prayer-requests"
     && msg.channel.name != "requesting-help"
     && msg.channel.name != "theology"
     && msg.channel.name != "testimonies"
     && msg.channel.name != "bible-study-chat"){
            msg.channel.send("Yo Pace!");
        }
        
        if(msg.content.includes("<@!802168653797392414>") && msg.channel.name != "worship-music"
        && msg.channel.name != "daily-encouragement"
        && msg.channel.name != "accountability"
        && msg.channel.name != "prayer-requests"
        && msg.channel.name != "requesting-help"
        && msg.channel.name != "theology"
        && msg.channel.name != "testimonies"
        && msg.channel.name != "bible-study-chat") {
            var emoji = client.emojis.cache.get("826563972127916092");
                   const alarm = client.emojis.cache.get("826095842431205437")
            msg.react(emoji);
            msg.react(alarm);
        }



        // DEFINITIONS


        if(msg.content.includes("!define ")) {
            console.log("Saw a define keyword.")

            var word = msg.content.substring(msg.content.indexOf("!define") + 8, msg.content.length);
            console.log(word);
            
            
            getDefinition(word, (result, e) => {
               

                if(result[0].definition != undefined ) {
                    
                    var deflist = ""
                for(var i=0; i<result.length; i++){
                    console.log(result[i]);
                    deflist += "\n" +  (i + 1).toString() + ". " +  word + " [" + result[i].partOfSpeech +"] : \n" + result[i].definition.replace(/:/g, " > ");
                } 

                 
                    
                    msg.reply("See the definition below: " + deflist); 
                }
                else {
                    msg.reply("Can't find that word in the Merriam Webster dictionary")
                }
                
           /*     for(var i=0; i<result.length; i++){
                    console.log(i+'.');
                    console.log('Part of speech: '+result[i].partOfSpeech);
                    console.log('Definitions: '+result[i].definition);

                    console.log(result[i].definition)
                }
                */
            })
        }
    
});


function getDefinition(word, callback) {
    raw(word, function(result, error){
    if (error === null) {


        let results = [];

        if (result.entry_list.entry != undefined) {
            let entries = result.entry_list.entry;
            for (var i=0; i<entries.length; i++){

                //remove erroneous results (doodle != Yankee Doodle)
                if (entries[i].ew == word) {

                    //construct a more digestable object
                    const definition = entries[i].def[0].dt;
                    const partOfSpeech = entries[i].fl;

                    results.push({
                        partOfSpeech: entries[i].fl,
                        definition: entries[i].def[0].dt.map(entry => {
                            if (typeof(entry) === 'string') {
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
    
    var url =  MW_ROOT+word+'?key='+mwkey;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            xml.parseString(body, function(error, result){
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
