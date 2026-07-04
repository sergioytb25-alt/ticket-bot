const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../../ticketConfig.json');

function loadConfig() {
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
  return {
    categories: [
      { name: 'support', label: 'Support', emoji: '🆘' },
      { name: 'report', label: 'Signalement', emoji: '📋' },
      { name: 'appeal', label: 'Appel', emoji: '⚖️' },
      { name: 'partnership', label: 'Partenariat', emoji: '🤝' }
    ],
    colors: {
      primary: '#5865F2',
      success: '#57F287',
      error: '#ED4245',
      warning: '#FEE75C',
      info: '#00B0F4'
    },
    messages: {
      welcome: 'Bienvenue dans ce ticket de support!',
      maxTickets: 3,
      ticketPrefix: 'ticket'
    },
    panelButtons: [
      { name: 'support', label: 'Support', emoji: '🆘' },
      { name: 'report', label: 'Signalement', emoji: '📋' },
      { name: 'appeal', label: 'Appel', emoji: '⚖️' },
      { name: 'partnership', label: 'Partenariat', emoji: '🤝' }
    ],
    panelMessage: '**🎫 Système de Tickets**\n\nSélectionnez la catégorie de votre ticket ci-dessous pour créer un nouveau ticket.',
    allAvailableButtons: [
      { name: 'support', label: 'Support', emoji: '🆘' },
      { name: 'report', label: 'Signalement', emoji: '📋' },
      { name: 'appeal', label: 'Appel', emoji: '⚖️' },
      { name: 'partnership', label: 'Partenariat', emoji: '🤝' },
      { name: 'bug', label: 'Signaler un Bug', emoji: '🐛' },
      { name: 'suggestion', label: 'Suggestion', emoji: '💡' },
      { name: 'feedback', label: 'Feedback', emoji: '📝' },
      { name: 'other', label: 'Autre', emoji: '❓' }
    ]
  };
}

function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

module.exports = {
  customId: 'add_custom_button_modal',
  async execute(interaction) {
    const config = loadConfig();
    const label = interaction.fields.getTextInputValue('button_label');
    const emoji = interaction.fields.getTextInputValue('button_emoji');
    const name = interaction.fields.getTextInputValue('button_name');

    if (config.allAvailableButtons.some(btn => btn.name === name)) {
      return interaction.reply({
        content: `❌ Un bouton avec l'ID "${name}" existe déjà!`,
        ephemeral: true
      });
    }

    const newButton = { name, label, emoji };
    config.allAvailableButtons.push(newButton);
    config.panelButtons.push(newButton);
    saveConfig(config);

    interaction.reply({
      content: `✅ Bouton "${label}" (${emoji}) ajouté avec succès!\nID: ${name}`,
      ephemeral: true
    });
  }
};