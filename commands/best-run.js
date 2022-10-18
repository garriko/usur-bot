const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("best run")
		.setDescription("Best MM+ for the week !")
		.addStringOption(option =>
			option.setName("player")
				.setDescription("Nom du joueur")
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply("Pong!");
	},
};
