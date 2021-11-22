const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const fs = require('fs');
const db = require('quick.db')
const { token, SCHANNELID } = require('./config.json')
const picExt = [".webp",".png","jpg",".jpeg",".gif"]
client.on('ready', () => {
	console.log(`${client.user.username} online!`);
	client.user.setPresence({
		activiti: {
			name:'Dms để gửi confession!'
		},
		status: 'idle',
	});
})

client.on('message', async (message) => {
	if (message.author.bot) return;
	if (message.channel.type !== 'dm') return;
	if (message.content.length > 1024) return message.channel.send('Confession tối đa chỉ 1024 ký tự.');
	else {
		await message.react('✨');
		massge.channel.send('Đã gửi yêu cầu confession.');
		let count = JSON.parse (fs.readFileSync('./count.json'));
		count++;
		var data = new db.table(`${count}`)
		data.set('content', message.content)
		data.set('author' , message.author.id)
		const sChannel = client.channels.cache.get(SCHANNELID);
		if (!sChannel) return;
		const embed = new MessageEmbed()
		    .setDescription(`${message.content}`)
		    .setFooter(`Confession #${count} | ${message.author.username}`);
		if (message.attachments.array().length > 0) {
			let attachment = message.attachments.array()[0];
		};
		picExt.forEach(ext => {
			if (attachment.name.endsWith(ext)) embed.setImage(attachment.attachment);
		});
		sChannel.send(embed);
	}
});

client.login(token);