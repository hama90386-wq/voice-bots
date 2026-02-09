const { Client, GatewayIntentBits } = require("discord.js");
const {
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
  getVoiceConnection,
} = require("@discordjs/voice");

const TOKEN = process.argv[2];

const GUILD_ID = "1444407947005526170";
const CHANNEL_ID = "1470504407010382028";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

async function connectWithRetry() {
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = await guild.channels.fetch(CHANNEL_ID);

    if (!channel.isVoiceBased()) return;

    const existing = getVoiceConnection(guild.id);
    if (existing) return;

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: false,
    });

    await entersState(connection, VoiceConnectionStatus.Ready, 20000);
    console.log(`${client.user.tag} دخل الفويس 🎧`);
  } catch (err) {
    console.log(`${client.user?.tag || "Bot"} فشل يدخل — إعادة المحاولة بعد 15 ثانية`);
    setTimeout(connectWithRetry, 15000);
  }
}

client.once("clientReady", async () => {
  console.log(`جاهز: ${client.user.tag}`);

  // محاولة أولى
  setTimeout(connectWithRetry, 5000);

  // مراقبة مستمرة (لو طلع يرجع)
  setInterval(connectWithRetry, 30000);
});

client.login(TOKEN).catch(console.error);

