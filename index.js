// dependencies

const Discord = require('discord.js');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { channelId, userId, guildId, token} = require('./data.json');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILDS] });

const zeroPad = (num) => String(num).padStart(2, '0')

const printWithTimestamp = (message) => {

    const currentTime = new Date();

    console.log(`[${zeroPad(currentTime.getHours())}:${zeroPad(currentTime.getMinutes())}:${zeroPad(currentTime.getSeconds())}] ${message}`);
}

let channel;
let user;

client.on('ready', async () => {

    printWithTimestamp(`Logged in as ${client.user.tag}`);

    // fetch channel

    channel = client.guilds.cache.get(guildId).channels.cache.get(channelId);

    // fetch user

    user = await client.users.fetch(userId);

    // execute at 12 am
    cron.schedule('0 0 12 * * * *', () => {
        printWithTimestamp(`Marvin benachrichtigen`);
        sendMessage();
    });
});

const sendMessage = async () => {

    const randomImage = Math.floor(Math.random() * (imagesToPrint.length));
    const randomMessage = Math.floor(Math.random() * (messagesToPrint.length));

    // prepare contents
    const message = `${messagesToPrint[randomMessage]} ${user.toString()}`;
    const image = imagesToPrint[randomImage];
    
    // does not work this way, maybe check at some point
    //await channel.send('hamegululu', { files: ['https://puu.sh/IDcax/cdd3906291.png']});
    channel.send(message);
    channel.send(image);
}

const messagesToPrint = [ 'Schon Proteine genommen?', 'Marvin Proteine nehmen nicht vergessen!!!'];
const imagesToPrint = [ 'https://puu.sh/IDto7/f06b3def19.jpg', 'https://puu.sh/IDtoq/73cfb5fb4b.png', 'https://puu.sh/IDtoK/6b201964c2.png'];

// send marvin a message everyday at 12 pm

client.login(token);