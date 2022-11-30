const { Client, GatewayIntentBits } = require('discord.js');

/* Misc */
console.clear();

/* Initialize client */
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
    ],
});

  


const boilerplateComponents = async () => {
  await require('./util/boilerplateClient')(client);
}

boilerplateComponents();