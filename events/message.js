const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	once: false,
	execute(message) {
    // console.log(message);
    const rand = getRandomPercent();
		switch(message.author.id) {
      case process.env.MEYKKO_USER_ID:
        if(rand < 10) {
          message.react("🧔🏻") ;
        }
        break;
      case process.env.KARRE_USER_ID:        
        if(rand < 3) {
          message.react("🟦") ;
        }
      break;
      case process.env.GERMAK_USER_ID:    
        if(rand < 5) {
          message.react("❤️") ;
        }
      break;    
    }
  },
};

function getRandomPercent() {
  return Math.floor(Math.random() * 100);
}
