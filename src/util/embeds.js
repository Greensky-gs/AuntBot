const { EmbedBuilder, Client, CommandInteraction, PermissionsBitField } = require("discord.js");

/**
 * 
 * @param {Client} bot 
 * @param {CommandInteraction} interaction 
 * @param {string} description
 * @param {string} reason
 * @param {{name: string, description: string, acceptDirectMessages: true | null, voiceOnly: boolean, ownerOnly: boolean, adminOnly: boolean, blacklistAllowed: boolean, whitelistAllowed: boolean, permissions: [], botPermissions: [], options: ApplicationCommandOptionBase, ephemeral: boolean, execute: (bot, command, db) => {}}} command
 */
const errorEmbed = async (bot, interaction, description, reason, command) => {
    let permissions = {
        "Administrator": `${bot.emojisList.admin} - Administrator`,
        "ManageMembers": `${bot.emojisList.mod} - Ban and/or kick`,
        "ManageChannels": `${bot.emojisList.channel} - Manage channels`,
        "ManageRoles": `${bot.emojisList.id} - Manage roles`,
        "ManageEmojisAndStickers": `${bot.emojisList.automod} - Manage emojis and stickers`,
        "ManageGuild": `${bot.emojisList.community} - Manage guild`
    }

    let embed = await new EmbedBuilder()
    .setDescription(`**${description}**`)
    .setFooter({
        "text": "Powered by Aunt Development.",
        "iconURL": bot.user.displayAvatarURL({extension: "png", forceStatic: false, size: 2048})
    })
    .setColor(bot.colors.false)
    
    switch (reason) {
        case "userPerms":
            embed.addFields({
                name: `<t:${Math.round(Date.now() / 1000)}:R>`,
                value: `${bot.emojisList.chat} - Missed permissions: \`n>>> ${command.permissions.filter((permission) => !interaction.member.permissions.has(PermissionsBitField.Flags[permission])).map((permission) => permissions[permission]).join("\n")}`,
                inline: false
            })
        case "botPerms":
            embed.addFields({
                name: `<t:${Math.round(Date.now() / 1000)}:R>`,
                value: `${bot.emojisList.chat} - Missed permissions: \n>>> ${command.botPermissions.filter((permission) => !interaction.guild.members.me.permissions.has(PermissionsBitField.Flags[permission])).map((permission) => permissions[permission]).join("\n")}`,
                inline: false
            })
    }

    return await interaction.reply({embeds: [embed]})
}

module.exports = {
    errorEmbed,
}