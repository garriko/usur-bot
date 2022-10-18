const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setWoWGuild")
		.setDescription("Configuration du bot")
		.addStringOption(option =>
			option.setName("realm")
				.setDescription("Royaume")
				.setRequired(true)),
  
	async execute(interaction) {
		await interaction.reply("Pong!");
	},
};