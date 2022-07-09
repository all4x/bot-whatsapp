const { default: axios } = require('axios');
const { Client, LocalAuth, MessageMedia, ChatTypes } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready')
})

client.on('message', async message => {
    const content = message.body
    const chat = await message.getChat() 


    if(content === '!cat') {
    const urlCat = await axios.get('https://api.thecatapi.com/v1/images/search').then(res => res.data[0].url)
    const media = await MessageMedia.fromUrl(urlCat)
    chat.sendMessage(media)
} else if ( message.reply === '!cat') {
    const urlCat = await axios.get('https://api.thecatapi.com/v1/images/search').then(res => res.data[0].url)
    const media = await MessageMedia.fromUrl(urlCat)
    chat.sendMessage(media)
}




})



client.initialize();