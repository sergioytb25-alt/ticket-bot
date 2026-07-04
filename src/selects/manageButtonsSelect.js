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
      { name: 'other', label: 'Autre', emoji: '📞' }
    ]
  };
}

function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

module.exports = {
  customId: 'manage_buttons_select',
  async execute(interaction) {
    const config = loadConfig();
    const selectedButtons = interaction.values;

    const allButtons = config.allAvailableButtons;

    config.panelButtons = allButtons.filter(btn => selectedButtons.includes(btn.name));
    saveConfig(config);

    interaction.reply({
      content: `✅ Configuration sauvegardée! ${config.panelButtons.length} bouton(s) actif(s): ${config.panelButtons.map(b => `${b.emoji} ${b.label}`).join(', ')}`,
      ephemeral: true
    });
  }
};