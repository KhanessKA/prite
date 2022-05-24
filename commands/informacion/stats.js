const discord = require('discord.js');
const config = require('../../settings/config.json');
const timezone = require("moment-timezone");
const moment = require("moment");
require("moment-duration-format");
const ms = require("ms");
const os = require("node:os");
const packageJson = require("../../package.json");
const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: "stats",
    description: "Te proporciona la informacion del bot",
    category: "informacion",
    aliases: ["stats"],
    cooldown: 5,
    syntax: "stats",
    run: async (client, message, args) => {




        if (!message.guild.me.permissions.has("EMBED_LINKS")) return message.channel.send({
            content: "No tengo permisos suficientes."
        });

        try {
            const duration = moment.duration(client.uptime).format("**D[D], H[H], m[M], s[S]**");

            const embed = new discord.MessageEmbed()
                .setTitle(`⚙ • System Statistics`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(config.color)
                .setDescription(`
\`\`\`asciidoc
• Platform - Arch     :: ${process.platform} - ${process.arch}
• Bot Uptime          :: ${duration}
• Memory Usage        :: ${formatBytes(process.memoryUsage.rss())}
• Process Uptime      :: ${ms(Math.round(process.uptime() * 1000), { long: true })}
• Node.js version     :: ${process.version}
• Discord.js version  :: v${discord.version}
• Bot Version         :: v${packageJson.version}
\`\`\`
            `)
                .setFooter(`Pedido por ${message.author.username}`)
            message.channel.send({ embeds: [embed] })
        } catch (e) {
            const embed = new discord.MessageEmbed()
                .setDescription(`${e}`)
                .setColor(config.color)
            message.channel.send({ embeds: [embed] })
        }




    }
}
function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};