// dependencies

const { Client, Intents } = require('discord.js');
const cron = require('node-cron');
const { channelId, userId, guildId, token} = require('./data.json');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

let channel;
let user;

client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}`);

    // fetch channel

    channel = client.guilds.cache.get(guildId).channels.cache.get(channelId);

    // fetch user

    user = client.guilds.cache.get(guildId).members.cache.get(userId);

    cron.schedule('* * * * * *', () => {
        console.log(`Marvin benachrichtigen`);
        sendMessage();
    });
});

const sendMessage = () => {

    const numberOfPosts = 2;

    const r = Math.floor(Math.random() * (numberOfPosts))
    
    // prepare contents
    const message = messagesToPrint[r];
    const image = imagesToPrint[r];

    channel.send(`${message} ${user.tag}`, { file: image});

}

const messagesToPrint = [ 'Schon Proteine genommen?', 'Marvin Proteine nehmen nicht vergessen!!!'];

const imagesToPrint = [ './images/image0.jpg', './images/image1.jpg'];

// send marvin a message everyday at 9 pm

client.login(token);