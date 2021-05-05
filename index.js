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
        
        msg.awaitReactions(filter,{max:1,time:6000,errors:['time']})
        .then(collected => {
          const move = collected.first().emoji.name;
          msg.edit(move).then(()=>console.log("succ")).catch((err)=>console.log("sad tormbone"))
        })  
      })
      .catch((err)=>console.log(err))
    }
    else
      console.log("no")
})

client.login(process.env.TOKEN)