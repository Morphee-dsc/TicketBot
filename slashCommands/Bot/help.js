const { readdirSync } = require("fs");

// Example of how to make a Help SlashCommand

module.exports = {
    name: "help",
    usage: '/help <command>',
    options: [
        {
            name: 'command',
            description: "Sur qu\`'elle commandes as-tu besoin d'aide !",
            type: 'STRING',
            required: false
        }
    ],
    category: "Bot",
    description: "Montre toute les commandes du bot",
    userPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    run: async (client, interaction) => {

        // Buttons that take you to a link
        // If you want to delete them, remove this part of
        // the code and in line: 62 delete ", components: [row]"
        const row = new client.discord.MessageActionRow()
        .addComponents(
            new client.discord.MessageButton()
            .setLabel("Support")
            .setStyle("LINK")
            .setURL("https://dsc.gg/whitehall")
        );

        const commandInt = interaction.options.getString("command");
        if (!commandInt) {

            // Get the slash commands of a Bot category
            const botCommandsList = [];
            readdirSync(`./slashCommands/Bot`).forEach((file) => {
                const filen = require(`../../slashCommands/Bot/${file}`);
                const name = `\`${filen.name}\``
                botCommandsList.push(name);
            });

            // Get the slash commands of a Utility category
            const utilityCommandsList = [];
            readdirSync(`./slashCommands/Utility`).forEach((file) => {
                const filen = require(`../../slashCommands/Utility/${file}`);
                const name = `\`${filen.name}\``
                utilityCommandsList.push(name);
            });

            // Get the slash commands of a Tickets category
            const ticketsCommandsList = [];
            readdirSync(`./slashCommands/Tickets`).forEach((file) => {
                const filen = require(`../../slashCommands/Tickets/${file}`);
                const name = `\`${filen.name}\``
                ticketsCommandsList.push(name);
            });

            // This is what it commands when using the command without arguments
            const helpEmbed = new client.discord.MessageEmbed()
            .setTitle(`${client.user.username} SlashHelp`)
            .setDescription(` Bonjour **<@${interaction.member.id}>** !, Je suis <@${client.user.id}>. \nTu peux utiliser \`/help <slash_command>\` pour avoir les infos d'une commandes spécifique !\n**Total Commandes:** ${client.commands.size}\n**Total SlashCommandes:** ${client.slash.size}`)
            .addField("🤖 - Bot SlashCommandees", botCommandsList.map((data) => `${data}`).join(", "), true)
            .addField("🛠 - Utility SlashCommandes", utilityCommandsList.map((data) => `${data}`).join(", "), true)
            .addField("📩 - Tickets SlashCommandes", ticketsCommandsList.map((data) => `${data}`).join(", "), true)
            .setColor(client.config.embedColor)
            .setImage('https://images-ext-2.discordapp.net/external/5Hxw0pUa05FK5rqr1L0aiXkKd-7tKNcPcbj2NXDgsGU/%3Fcb%3D20190206201633/https/static.wikia.nocookie.net/warriors-clans-diversity/images/7/7a/Half-Moon_Gathering.gif/revision/latest')
            .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

            interaction.reply({ embeds: [helpEmbed], components: [row] });
        } else {
            const command = client.slash.get(commandInt.toLowerCase());

            // This is what it sends when using the command with argument and it does not find the command
            if (!command) {
                interaction.reply({ content: `There isn't any SlashCommand named "${commandInt}"` });
            } else {

                // This is what it sends when using the command with argument and if it finds the command
                let command = client.slash.get(commandInt.toLowerCase());
                let name = command.name;
                let description = command.description || "No descrpition provided"
                let usage = command.usage || "No usage provided"
                let category = command.category || "No category provided!"

                let helpCmdEmbed = new client.discord.MessageEmbed()
                .setTitle(`${client.user.username} Help | \`${(name.toLocaleString())}\` SlashCommand`)
                .addFields(
                    { name: "Description", value: `${description}` },
                    { name: "Usage", value: `${usage}` },
                    { name: 'Category', value: `${category}` }
                )
                .setColor(client.config.embedColor)
                .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                interaction.reply({ embeds: [helpCmdEmbed] });
            }
        }
    },
};
