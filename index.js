const Discord = require("discord.js")
const client = new Discord.Client()

const prefix = "--"

var gameOut = ""


client.on("ready",() => {
  console.log(`Logged in as 
  ${client.user.tag}!`)
})

client.on("message" ,async msg => {
    if(msg.content == prefix + "invoke"){
      msg.delete();
      msg.channel.send("hello")
      .then(async msg => {
        try{
          await msg.react('⬅️')
          await msg.react('⬇️')
          await msg.react('➡️')
          await msg.react('⬆️')
        }
        catch{
          (err) => console.log(err)
        }
        const filter = (reaction,user) => 
          {return ['⬅️','⬇️','➡️','⬆️'].includes(reaction.emoji.name)}
        
        const collector = msg.createReactionCollector(filter, {idle: 15000 });
        collector.on("collect",async react => {
          console.log(react.emoji.name)
          await react.message.edit(react.emoji.name)
          await react.users.remove(react.users.cache.last().id);
        });
        collector.on('end',() => {msg.delete()});
      })
      .catch((err)=>console.log(err))
    }
    else
      console.log("no")
})

client.login(process.env.TOKEN)