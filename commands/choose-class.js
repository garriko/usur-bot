const { SlashCommandBuilder } = require("discord.js");
const { getRandom } = require("../service/random.js");

const classList = [{
  name: "Guerrier",
  classColor: "",
  specList: ["Protection", "Armes", "Fureur"]
},
{
  name: "Mage",
  classColor: "",
  specList: ["Arcane", "Feu", "Givre"]
}, {
  name: "Chasseur",
  classColor: "",
  specList: ["Survie", "Précision", "Maitrise des bêtes"]
}, {
  name: "Paladin",
  classColor: "",
  specList: ["Protection", "Rétribution", "Sacré"]
}, {
  name: "Démoniste",
  classColor: "",
  specList: ["Démonologie", "Destuction", "Affliction"]
}, {
  name: "Moine",
  classColor: "",
  specList: ["Maître Brasseur", "Marche-Vent", "Tisse-Brumes"]
}, {
  name: "Voleur",
  classColor: "",
  specList: ["Hors-la-loi", "Finesse", "Assassinat"]
},
{
  name: "Druide",
  classColor: "",
  specList: ["Restauration", "Equilibre", "Féral", "Gardien"]
}, {
  name: "Prêtre",
  classColor: "",
  specList: ["Sacré", "Ombre", "Discipline"]
}, {
  name: "Chasseur de démons",
  classColor: "",
  specList: ["Vengeance", "Dévastation"]
}, {
  name: "Evocateur",
  classColor: "",
  specList: ["Préservation", "Dévastation"]
}, {
  name: "Chevalier de la mort",
  classColor: "",
  specList: ["Protection", "Armes", "Fureur"]
}, {
  name: "Chaman",
  classColor: "",
  specList: ["Amélioration", "Elémentaire", "Restauration"]
}
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help-me-choose")
    .setDescription("Je ne sais pas choisir !"),
  async execute(interaction) {
    const classRand = classList[getRandom(classList.length)];
    const spec = classRand.specList[getRandom(classRand.specList.length)];
    await interaction.reply(`Tu devrais jouer : ${classRand.name} - ${spec}`);
    //const classSpec = getRandom(3);
  }
};