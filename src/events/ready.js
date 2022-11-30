const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
require("dotenv").config();
const { ChalkAdvanced } = require("chalk-advanced");

const { joinVoiceChannel } = require('@discordjs/voice');




module.exports = async (client) => {

 async function voiceJoin() {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    await  joinVoiceChannel({
      channelId: '1047529017898709072',
      guildId: '971897377776615494',
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false
    })
  }
setInterval(() => {
  voiceJoin()
}, 7200000);

voiceJoin()

  const commandFiles = readdirSync("./src/commands/").filter((file) =>
    file.endsWith(".js")
  );

  const commands = [];

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  const rest = new REST({
    version: "10",
  }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.STATUS === "PRODUCTION") { // If the bot is in production mode it will load slash commands for all guilds
        await rest.put(Routes.applicationCommands(client.user.id), {
          body: commands,
        });
        console.log(`${ChalkAdvanced.white("Boilerplate Bot")} ${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green("Successfully registered commands globally")}`);

      } else {
        await rest.put(
          Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
          {
            body: commands,
          }
        );

        console.log(`${ChalkAdvanced.white("Boilerplate Bot")} ${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green("Successfully registered commands locally")}`);
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();
  client.user.setPresence({
    activities: [{ name: `${process.env.BOTSTATUS}` }],
    status: `${process.env.DISCORDSTATUS}`,
  });

};
