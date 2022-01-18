// dependencies

const Discord = require('discord.js');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { channelId, userId, guildId, token} = require('./data.json');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILDS] });

let channel;
let user;

client.on('ready', async () => {

    console.log(`Logged in as ${client.user.tag}`);

    // fetch channel

    channel = client.guilds.cache.get(guildId).channels.cache.get(channelId);

    // fetch user

    user = await client.users.fetch(userId);

    cron.schedule('* 12 * * * *', () => {
        console.log(`Marvin benachrichtigen`);
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