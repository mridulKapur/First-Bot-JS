const Discord = require("discord.js")
const client = new Discord.Client()

const prefix = "--"
const height = 10;
const length = 10;
var playerX = 1;
var playerY = 1;

const getInitialString = () => {
  var initialString = '';
  for(var i = 0;i<height;i++){
    for(var j = 0;j<length;j++){
      if(i==0||i==height-1||j===0 || j===length-1)
        initialString += '\\🟦'
      else if(playerX==j&&playerY==i)
        initialString+='\\🟥'
      else  
        initialString += '\\⬛'
    }
    initialString+='\n' 
  }
  return initialString
}

const editMap = (move) =>{
   if(move=='⬅️'){
     playerX--;
   }
   if(move=='⬇️'){
     playerY++;
   }
   if(move=='➡️'){
     playerX++;
   }
   if(move=='⬆️'){
     playerY--;
   }
   return getInitialString()
}


client.on("ready",() => {
  console.log(`Logged in as 
  ${client.user.tag}!`)
})

client.on("message" ,async msg => {
    if(msg.content == prefix + "test"){
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
    
    else if(msg.content === prefix + 'start'){
      msg.delete();
      const startMap = getInitialString();
      msg.channel.send(startMap)
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
          await react.message.edit(editMap(react.emoji.name))
          await react.users.remove(react.users.cache.last().id);
        });
        collector.on('end',() => {msg.delete()});
      })
        .catch((err)=>console.log(err));
    }

    else{
      console.log("no")
    }

})

client.login(process.env.TOKEN)