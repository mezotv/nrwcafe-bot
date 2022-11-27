const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
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
          { name: 'Weihnachtslichter', value: 'weihnachtslichter' },
        )),

  async execute(interaction, client) {
    interaction.deferReply({ ephemeral: false }).catch(err => console.error(err));
    const { body } = await request(interaction.user.displayAvatarURL({
      extension: 'png',
      size: 1024
    }));

    const canvas = Canvas.createCanvas(1024, 1024);
    const context = canvas.getContext('2d');

    const avatar = await Canvas.loadImage(await body.arrayBuffer());

    let link = ''

    switch (interaction.options.getString('category')) {
      case 'santahat':
        link = 'https://cdn.discordapp.com/attachments/981648706203955230/1046047801148190731/santahat.png';    
        context.drawImage(avatar, 0, 0, canvas.width, canvas.height);
        break;
      case 'snowoverlay':
        link = 'https://cdn.discordapp.com/attachments/981648706203955230/1046073867006902302/snowoverlay.png';
        context.drawImage(avatar, 0, 0, canvas.width, canvas.height);
        break;
      case 'adventoverlay':
        link = 'https://cdn.discordapp.com/attachments/981648706203955230/1046076551860584488/adventoverlay.png';
        context.drawImage(avatar, 0, 0, canvas.width, canvas.height);
        break;
      case 'weihnachtslichter':
        link = 'https://cdn.discordapp.com/attachments/981648706203955230/1046487591182147605/weihnachtslichter.png';
        context.drawImage(avatar, 0, 0, canvas.width, canvas.height);
        break;
      }

    const hat = await Canvas.loadImage(link);

    context.drawImage(hat, 0, 0, canvas.width, canvas.height);
    const attachment = new AttachmentBuilder(await canvas.encode('png'), {
      name: 'profile-image.png'
    });

    await interaction.editReply({
      content: "Dein neues profil bild ist fertig!",
      files: [attachment]
    }).catch(err => console.error(err));
  },
};