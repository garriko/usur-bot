const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { request } = require('undici');
const { getJSONResponse } = require("../utils/http.js");
const { raiderIO } = require('../config/api.json');

const ClientDb = require("@replit/database");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("report")
		.setDescription("Rapport MM+"),  
	async execute(interaction) {     
    await interaction.deferReply();
    const clientDb = new ClientDb();    
    
    const guildName = await clientDb.get(`${interaction.guildId}_wow_guild_name`);
    const realmName = await clientDb.get(`${interaction.guildId}_wow_guild_realm`);
    
    if(!guildName || !realmName) {
      await interaction.editReply("Bot non configuré");
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


        
        const recapEmbed = new EmbedBuilder()
	        .setColor(0x0099FF)
        	.setTitle('Récapitulatif')
          .setTimestamp();
        
        recapList.forEach(raiderProfile => {
          const runs = raiderProfile.mythic_plus_weekly_highest_level_runs;

          recapEmbed.addFields({
            name: raiderProfile.name,
            value: getRecap(runs)
          })
        });
         await interaction.editReply({embeds: [recapEmbed]});
        
      } catch (error) {
       await interaction.editReply("Error :( TODO");
      }
       
    }   
	},
};

function getRecap(runs) {
  if(!runs || runs.length === 0) {
    return "Aucun mm+ cette semaine";
  }

  runs.sort((a,b) => b.mythic_level - a.mythic_level);
  const bestRun = runs[0];
  
  return `${bestRun.dungeon} - ${bestRun.mythic_level}`;
}