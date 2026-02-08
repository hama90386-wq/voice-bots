const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const token = process.argv[2];

const GUILD_ID = "1444407947005526170";
const CHANNEL_ID = "1444407953766613084";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

client.once("clientReady", async () => {
  console.log(`جاهز: ${client.user.tag}`);

  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = await guild.channels.fetch(CHANNEL_ID);

  joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: true
  });

  console.log(`${client.user.tag} دخل الفويس`);
});

client.login(token);
