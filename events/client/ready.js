module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client 
     */
    async execute(client) {
        
        // Puts an activity
        client.user.setActivity("InspiDuSoir", {
            type: "WATCHING",
            name: "InspiDuSoir"
        });
        
        // Send a message on the console
        console.log(`[LOG] ${client.user.tag} est maintenant en ligne !\n[LOG] Bot prêt a interagir dans ${client.guilds.cache.size} servers\n[LOG] Bot prêt a interagir pour ${client.users.cache.size} utilisateurs`);
    }
}
