const {  SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nickname")
    .setDescription("Füge einen Nickname hinzu"),

  async execute(interaction, client) {


    const winterEmojis = [
        "🎄",
        "🎅",
        "🎁",
        "🎀",
        "⛄"
    ]

    const emoji = winterEmojis[Math.floor(Math.random() * winterEmojis.length)];

   const nickname = `${ interaction.member.nickname || interaction.user.username } ${ emoji }`;
    
    interaction.guild.members.cache.get(interaction.user.id).setNickname(nickname).catch(console.error);

    interaction.reply({ content: "Name wurde geändert", ephemeral: true });
  },
};
