const {  SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Adds something to you profile picture")
    .addStringOption(option =>
      option.setName('category')
        .setDescription('The gif category')
        .setRequired(true)
    .addChoices(
      { name: 'Winter Mütze', value: 'santahat' },
      { name: 'Schnee', value: 'snowoverlay' },
      { name: 'Adventskranz', value: 'adventoverlay' },
    )),

  async execute(interaction, client) {
    interaction.deferReply({ ephemeral: false }).catch(err => console.error(err));
    const { body } = await request(interaction.user.displayAvatarURL({ extension: 'png', size: 1024 }));

    const canvas = Canvas.createCanvas(1024, 1024);
		const context = canvas.getContext('2d');

    const avatar = await Canvas.loadImage(await body.arrayBuffer());

    let link = ''

    if (interaction.options.getString('category') === 'santahat') {
      link = 'https://cdn.discordapp.com/attachments/981648706203955230/1046047801148190731/santahat.png'
    } else if (interaction.options.getString('category') === 'snowoverlay') {
      link = 'https://cdn.discordapp.com/attachments/981648706203955230/1046073867006902302/snowoverlay.png'
    } else {
      link = 'https://cdn.discordapp.com/attachments/981648706203955230/1046076551860584488/adventoverlay.png'
    }

    const hat = await Canvas.loadImage(link);




    context.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    context.drawImage(hat, 0, 0, canvas.width, canvas.height);
    const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

   await interaction.editReply({ content: "Dein neues profil bild ist fertig!", files: [attachment] }).catch(err => console.error(err));
  },
};
