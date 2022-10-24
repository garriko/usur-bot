const { Events, ActivityType } = require('discord.js');

const ClientDb = require("@replit/database");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log("Ready!");
    client.user.setStatus("online");
    client.user.setActivity({
      type: ActivityType.Listening,
      name: "Hoodin"
    });
  },
};
