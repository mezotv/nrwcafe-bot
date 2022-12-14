const {  SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const isChristmas = require('is-christmas');
 
module.exports = {
  data: new SlashCommandBuilder()
    .setName("weihnachten")
    .setDescription("FΓΌge einen Nickname hinzu"),

  async execute(interaction, client) {

    const weihnachtsembed = new EmbedBuilder()
    .setColor('#ff0000')
    .setTitle('Noch kein Weihnachten')
    .setDescription('Wir mΓΌssen noch ein paar Tage warten. \n Weihnachten ist <t:1671922800:R> ππ')
    
    if(!isChristmas()) return interaction.reply({ embeds: [weihnachtsembed], ephemeral: false });

    if (isChristmas()) weihnachtsembed
    .setDescription('Heute ist Weihnachten! ππππβ')


    interaction.reply({ embeds: [weihnachtsembed], ephemeral: false });
  },
};
