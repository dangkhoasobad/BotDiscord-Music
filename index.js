const { Client, GatewayIntentBits, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Player } = require('discord-player');
const { config } = require('dotenv');
const fs = require('fs');

// Load environment variables
config();

// Load config file
const botConfig = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Setup the music player
const player = new Player(client);

// Commands collection
client.commands = new Collection();

// Slash commands for music controls
const slashCommands = [
  {
    name: 'play',
    description: 'Phát nhạc từ YouTube',
    options: [{ name: 'song', type: 3, description: 'Tên hoặc URL bài hát', required: true }]
  },
  { name: 'skip', description: 'Bỏ qua bài hát hiện tại' },
  { name: 'stop', description: 'Dừng phát nhạc và thoát' },
  { name: 'queue', description: 'Xem danh sách phát' },
  { name: 'autoplay', description: 'Bật/tắt tự động phát nhạc tiếp theo' }
];

// Prefix commands: `!` based
client.on('messageCreate', async (message) => {
  if (!message.guild || message.author.bot) return;

  if (!message.content.startsWith(botConfig.prefix)) return;

  const args = message.content.slice(botConfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    const query = args.join(' ');
    if (!query) return message.reply('Bạn cần nhập tên hoặc URL bài hát.');
    const res = await player.search(query, { requestedBy: message.author });
    if (!res || !res.tracks.length) return message.reply('Không tìm thấy bài hát nào.');
    const queue = await player.createQueue(message.guild, { metadata: message.channel });
    await queue.join(message.member.voice.channel);
    queue.play(res.tracks[0]);
    message.channel.send(`Đang phát: **${res.tracks[0].title}**`);
  }

  if (command === 'skip') {
    const queue = player.getQueue(message.guild.id);
    if (!queue || !queue.playing) return message.reply('Không có bài hát nào đang phát.');
    queue.skip();
    message.channel.send('Đã bỏ qua bài hát!');
  }

  if (command === 'stop') {
    const queue = player.getQueue(message.guild.id);
    if (!queue) return message.reply('Không có bài hát nào đang phát.');
    queue.destroy();
    message.channel.send('Đã dừng nhạc và thoát!');
  }

  if (command === 'queue') {
    const queue = player.getQueue(message.guild.id);
    if (!queue) return message.reply('Danh sách phát hiện đang trống.');
    message.channel.send(`Danh sách phát:\n${queue.tracks.map((track, i) => `${i + 1}. ${track.title}`).join('\n')}`);
  }

  if (command === 'autoplay') {
    const queue = player.getQueue(message.guild.id);
    if (!queue) return message.reply('Không có danh sách phát.');
    queue.setAutoplay(!queue.autoplay);
    message.channel.send(`Tự động phát: **${queue.autoplay ? 'Bật' : 'Tắt'}**`);
  }

  // Command help
  if (command === 'help') {
    const helpEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Danh sách lệnh hỗ trợ')
      .setDescription('Dưới đây là tất cả các lệnh mà bot hỗ trợ:')
      .addFields(
        { name: '/play <song>', value: 'Phát nhạc từ YouTube dựa trên tên hoặc URL.' },
        { name: '/skip', value: 'Bỏ qua bài hát hiện tại.' },
        { name: '/stop', value: 'Dừng nhạc và thoát kênh.' },
        { name: '/queue', value: 'Xem danh sách phát hiện tại.' },
        { name: '/autoplay', value: 'Bật/tắt tự động phát bài hát tiếp theo.' },
        { name: '!play <song>', value: 'Phát nhạc bằng prefix từ YouTube.' },
        { name: '!skip', value: 'Bỏ qua bài hát hiện tại.' },
        { name: '!stop', value: 'Dừng phát nhạc và thoát kênh.' },
        { name: '!queue', value: 'Xem danh sách phát hiện tại.' },
        { name: '!autoplay', value: 'Bật/tắt tự động phát nhạc.' }
      )
      .setFooter({ text: 'Bot by Đỗ Đăng Khoa', iconURL: 'https://example.com/icon.png' });

    // Add buttons
    const buttons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Discord Server Bot')
          .setStyle(ButtonStyle.Link)
          .setURL('https://discord.gg/YOUR_DISCORD_SERVER'),
        new ButtonBuilder()
          .setLabel('Facebook Admin')
          .setStyle(ButtonStyle.Link)
          .setURL('https://facebook.com/YOUR_FACEBOOK_PAGE')
      );

    message.channel.send({ embeds: [helpEmbed], components: [buttons] });
  }
});

// Slash command handler
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'play') {
    const query = options.getString('song');
    const res = await player.search(query, { requestedBy: interaction.user });
    if (!res || !res.tracks.length) return interaction.reply('Không tìm thấy bài hát nào.');
    const queue = await player.createQueue(interaction.guild, { metadata: interaction.channel });
    await queue.join(interaction.member.voice.channel);
    queue.play(res.tracks[0]);
    interaction.reply(`Đang phát: **${res.tracks[0].title}**`);
  }

  if (commandName === 'skip') {
    const queue = player.getQueue(interaction.guild.id);
    if (!queue || !queue.playing) return interaction.reply('Không có bài hát nào đang phát.');
    queue.skip();
    interaction.reply('Đã bỏ qua bài hát!');
  }

  if (commandName === 'stop') {
    const queue = player.getQueue(interaction.guild.id);
    if (!queue) return interaction.reply('Không có bài hát nào đang phát.');
    queue.destroy();
    interaction.reply('Đã dừng nhạc và thoát!');
  }

  if (commandName === 'queue') {
    const queue = player.getQueue(interaction.guild.id);
    if (!queue) return interaction.reply('Danh sách phát hiện đang trống.');
    interaction.reply(`Danh sách phát:\n${queue.tracks.map((track, i) => `${i + 1}. ${track.title}`).join('\n')}`);
  }

  if (commandName === 'autoplay') {
    const queue = player.getQueue(interaction.guild.id);
    if (!queue) return interaction.reply('Không có danh sách phát.');
    queue.setAutoplay(!queue.autoplay);
    interaction.reply(`Tự động phát: **${queue.autoplay ? 'Bật' : 'Tắt'}**`);
  }
});

// Register slash commands
client.on('ready', async () => {
  console.log(`${client.user.tag} đã sẵn sàng!`);
  const guildId = 'YOUR_GUILD_ID'; // Thay thế bằng ID server của bạn
  const guild = client.guilds.cache.get(guildId);
  if (guild) {
    await guild.commands.set(slashCommands);
    console.log('Đã đăng ký slash commands.');
  }
});

// Login bot
client.login(process.env.DISCORD_TOKEN);
