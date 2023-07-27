module.exports = {
    name: "add",
    options: [
        {
            name: "user",
            description: "Ecris l'utilisateur a ajouter au ticket !",
            type: "USER",
            required: true
        }
    ],
    category: "Tickets",
    description: "Ajoute un utilisateur au ticket",
    userPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    run: async (client, interaction, args) => {
        let user = interaction.options.getUser("user");

        if(interaction.channel.name.includes("close") || interaction.channel.name.includes("ticket")) {
            interaction.channel.permissionOverwrites.edit(user.id, {
                ATTACH_FILES: true,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
            });
            
            interaction.reply({ content: `${user} a était ajouté par ${interaction.user}` });
        } else {
            interaction.reply({ content: "Cette commande peut uniquement être utiliser dans un ticket !", ephemeral: true });
        }
    }
}