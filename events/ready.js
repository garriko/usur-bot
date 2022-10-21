const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log("Ready!");
    client.user.setStatus("online");
    client.user.setActivity({
      type: ActivityType.Listening,
      name: "Hoodin"
    });
	},
};
