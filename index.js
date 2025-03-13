const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialisation du client WhatsApp avec LocalAuth
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: false } // Mettre false pour voir le navigateur
});

// Affichage du QR Code
client.on('qr', qr => {
    console.log('📲 Scanne ce QR Code avec WhatsApp pour te connecter :');
    qrcode.generate(qr, { small: true });
});

// Connexion réussie
client.on('ready', () => {
    console.log('✅ Bot WhatsApp est connecté et prêt à l’emploi !');

    // Envoi d'un message automatique après connexion
    sendMessageTo("221771741636", "🔥 Salut, je suis EthicWheelerX Bot !");
});

// Fonction pour envoyer un message à un numéro
function sendMessageTo(number, text) {
    client.sendMessage(number + "@c.us", text)
        .then(response => {
            console.log("📤 Message envoyé avec succès !");
        })
        .catch(err => {
            console.error("❌ Erreur lors de l'envoi du message :", err);
        });
}

// Gestion des messages reçus
client.on('message', async message => {
    console.log(`📩 Message reçu de ${message.from}: ${message.body}`);

    const command = message.body.toLowerCase();

    if (command === '.menu') {
        message.reply(`📜 *Menu du Bot EthicWheelerX* 📜
        - \`.menu\` : Afficher ce menu
        - \`.bot\` : Démarrer le bot
        - \`.aide\` : Obtenir de l'aide
        - \`.info\` : Informations sur le chat
        - \`.ping\` : Vérifier si le bot est actif
        - \`.heure\` : Afficher l'heure actuelle
        - \`.blague\` : Recevoir une blague aléatoire`);
    } else if (command === '.bot') {
        message.reply("👋 Salut ! Je suis EthicWheelerX Bot. Comment puis-je t'aider ?");
    } else if (command === '.aide') {
        message.reply("💡 Tape `.menu` pour voir les options disponibles.");
    } else if (command === '.ping') {
        message.reply("🏓 Pong ! Le bot est bien actif.");
    } else if (command === '.heure') {
        const date = new Date();
        message.reply(`🕒 Il est actuellement ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    } else if (command === '.info') {
        try {
            const chat = await message.getChat();
            let info = "";

            if (chat.isGroup) {
                const participants = chat.participants.length;
                info = `*Groupe* : ${chat.name}\n*Participants* : ${participants}\n*Description* : ${chat.description || "Aucune"}`;
            } else {
                info = `*Chat privé* avec ${message.from.split('@')[0]}`;
            }

            message.reply(info);
        } catch (error) {
            message.reply("❌ Erreur lors de la récupération des informations du chat.");
            console.error(error);
        }
    } else if (command === '.blague') {
        const blagues = [
            "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau !",
            "Qu'est-ce qu'un crocodile qui surveille la pharmacie ? Un Lacoste garde !",
            "Que dit un escargot quand il croise une limace ? Oh, un naturiste !",
            "Quel est le comble pour un électricien ? De ne pas être au courant !",
            "Qu'est-ce qui est jaune et qui attend ? Jonathan !"
        ];

        const blagueAleatoire = blagues[Math.floor(Math.random() * blagues.length)];
        message.reply(`😂 *Blague du jour* :\n${blagueAleatoire}`);
    }
});

// Lancer le bot
client.initialize();