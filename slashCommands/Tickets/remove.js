module.exports = {
    name: "remove",
    options: [
        {
            name: "user",
            description: "Ecris l'utilisateur a retirer du ticket !",
            type: "USER",
            required: true
        }
    ],
    category: "Tickets",
    description: "Enlever un utilisateur du ticket",
    userPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    run: async (client, interaction, args) => {
        let user = interaction.options.getUser("user");

        if(interaction.channel.name.includes("close") || interaction.channel.name.includes("ticket")) {
            interaction.channel.permissionOverwrites.edit(user.id, {
                ATTACH_FILES: false,
                READ_MESSAGE_HISTORY: false,
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
            });

            interaction.reply({ content: `${user} a était retiré du ticket par ${interaction.user}` });
        } else {
            interaction.reply({ content: "Cette commande peut uniquement être utiliser dans un ticket !", ephemeral: true });
        }
    }
}