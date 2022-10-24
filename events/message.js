const { Events } = require('discord.js');

const ClientDb = require("@replit/database");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    // console.log(message);
    const rand = getRandomPercent();
    let clientDb = null;
    switch (message.author.id) {
      case process.env.MEYKKO_USER_ID:
        if (rand < 5) {
          message.react("🧔🏻");
        }
        break;
      case process.env.KARRE_USER_ID:
        if (rand < 3) {
          message.react("🟦");
        }
        break;
      case process.env.GERMAK_USER_ID:
        if (rand < 5) {
          message.react("❤️");
        }
        break;    
      case process.env.TAYLOR_USER_ID:
        clientDb = new ClientDb();    
        const lastDay = await clientDb.get("taylor-event-last-day");
        const d = new Date();
        const now = d.getDate()  + "-" + (d.getMonth()+1);
        
        if (rand < 1 && now !== lastDay) {
          message.reply("'Cause we're young, and we're reckless\nWe'll take this way too far\nIt'll leave you breathless, mm\nOr with a nasty scar\nGot a long list of ex-lovers\nThey'll tell you I'm insane\nBut I've got a blank space, baby\nAnd I'll write your name");    
          await clientDb.set("taylor-event-last-day", now);
        }
        break;
    }
  },
};

function getRandomPercent() {
  return Math.floor(Math.random() * 100);
}

