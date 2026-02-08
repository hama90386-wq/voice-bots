const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");

const tokens = [
  process.env.TOKEN1,
  process.env.TOKEN2,
  process.env.TOKEN3
];

const GUILD_ID = "1444407947005526170";
const CHANNEL_ID = "1444407953766613084";

async function connectToVoice(client) {
  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = await guild.channels.fetch(CHANNEL_ID);

  const existing = getVoiceConnection(guild.id);

  if (!existing) {
    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: true,
    });
    console.log(`${client.user.tag} دخل الفويس`);
  }
}

async function startBot(token, delay) {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  });

  client.once("clientReady", async () => {
    console.log(`جاهز: ${client.user.tag}`);

    setTimeout(() => connectToVoice(client), delay);

    // اذا طلع من الفويس يرجع يدخل
    setInterval(() => connectToVoice(client), 30000);
  });

  client.login(token).catch(console.error);
}

tokens.forEach((t, i) => startBot(t, i * 5000));
