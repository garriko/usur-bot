const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { request } = require('undici');
const { getJSONResponse } = require("../utils/http.js");
const { raiderIO } = require('../config/api.json');

const ClientDb = require("@replit/database");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("best-weekly")
		.setDescription("Top MM+ run of the week !"),
	async execute(interaction) {
		await interaction.deferReply();
    const clientDb = new ClientDb();    
    
    const guildName = await clientDb.get(`${interaction.guildId}_wow_guild_name`);
    const realmName = await clientDb.get(`${interaction.guildId}_wow_guild_realm`);
    
    if(!guildName || !realmName) {
      await interaction.editReply("Bot non configuré !!");
    } else {
      try {
        const responseGuild = await request(`${raiderIO}guilds/profile?region=eu&realm=${realmName}&name=${guildName}&fields=members`);        
 
        const {members} = await getJSONResponse(responseGuild.body);

        const memberSearchList = [];
        
        members
          .filter(member => member.rank <= 3)
          .forEach(member => {
            const name = member.character.name;
            const requestMember = request(`${raiderIO}characters/profile?region=eu&realm=${realmName}&name=${name}&fields=mythic_plus_weekly_highest_level_runs`);
           
            memberSearchList.push(
              requestMember
                .then(response => getJSONResponse(response.body))
            );
          });

        
        const recapList = await Promise.all(memberSearchList);

        const bestPlayer = findBestPlayer(recapList);
        if(bestPlayer) {
          const bestDungeon = bestPlayer.mythic_plus_weekly_highest_level_runs[0];
          
        const topEmbed = new EmbedBuilder()
	        .setColor(0x0099FF)
        	.setTitle(`${bestPlayer.name} est trop fort (cette semaine)!`)
          .setThumbnail(bestPlayer.thumbnail_url)
          .addFields({
            name: "Meilleur donjon",
            value: `${bestDungeon.dungeon} - ${bestDungeon.mythic_level}`
          });

          // send embed
          await interaction.editReply({embeds: [topEmbed]});
        } else {
          await interaction.editReply("Rien :'(");
        }
      } catch (error) {
       await interaction.editReply("Error :( TODO : " + error);
      }
    }
	},
};

function findBestPlayer(recapList) {
  let bestRun = null;
  let bestPlayer = null;
  recapList.forEach(recap => {
    if(recap.mythic_plus_weekly_highest_level_runs && recap.mythic_plus_weekly_highest_level_runs.length > 0) {
      // TODO improve
      const currentBest = recap.mythic_plus_weekly_highest_level_runs[0];
      if(!bestRun) {
        bestRun = currentBest;
        bestPlayer = recap;
      }
      if(currentBest && currentBest.mythic_level > bestRun.mythic_level) {
          bestRun = currentBest;
          bestPlayer = recap;
      }
    }    
  });

  return bestPlayer;
}