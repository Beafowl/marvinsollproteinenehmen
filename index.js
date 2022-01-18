// dependencies

const { Client, Intents, MessageAttachment } = require('discord.js');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { channelId, userId, guildId, token} = require('./data.json');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

let channel;
let user;

client.on('ready', async () => {

    console.log(`Logged in as ${client.user.tag}`);

    // fetch channel

    channel = client.guilds.cache.get(guildId).channels.cache.get(channelId);

    // fetch user

    user = await client.users.fetch(userId);

    sendMessage();

    /*cron.schedule('* * * * * *', () => {
        console.log(`Marvin benachrichtigen`);
        sendMessage();
    });*/
});

const sendMessage = () => {

    const numberOfPosts = 2;

    const r = Math.floor(Math.random() * (numberOfPosts))
    
    // prepare contents
    const message = messagesToPrint[r];
    const imagePath = path.join(__dirname, 'images', imagesToPrint[r]);

    channel.send(`${message} ${user.toString()}`, {

        files: [{

            attachment: imagePath,
            name: imagesToPrint[r],
            description: "Proteine"
        }]

    });
}

const messagesToPrint = [ 'Schon Proteine genommen?', 'Marvin Proteine nehmen nicht vergessen!!!'];

const imagesToPrint = [ 'image0.jpg', 'image1.png'];

// send marvin a message everyday at 9 pm

client.login(token);