const { SlashCommandBuilder } = require("discord.js");
const { request } = require('undici');
const { getJSONResponse } = require("../utils/http.js");
const { raiderIO } = require('../config/api.json');
const ClientDb = require("@replit/database");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("set-wow-guild")
		.setDescription("Configuration du bot")
		.addStringOption(option =>
			option.setName("realm")
				.setDescription("Royaume")
				.setRequired(true))
    .addStringOption(option =>
			option.setName("guild")
				.setDescription("Guilde")
				.setRequired(true)),  
	async execute(interaction) {
    await interaction.deferReply();
    const realm = interaction.options.getString("realm");
    const wowGuild = interaction.options.getString("guild");
    const response = await request(`${raiderIO}guilds/profile?region=eu&realm=${realm}&name=${wowGuild}`);
    

    if(response && response.statusCode === 200) {
      const guildFound = await getJSONResponse(response.body);
      const clientDb = new ClientDb();
      

      await clientDb.set(`${interaction.guildId}_wow_guild_name`, guildFound.name);
      await clientDb.set(`${interaction.guildId}_wow_guild_realm`, guildFound.realm);

      console.log(await clientDb.list());
      
      await interaction.editReply("Saved - " + guildFound.name + " !");
    } else {
      await interaction.editReply("Not found");
    }
	},
};