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
    panelMessage: '**🎫 Système de Tickets**\n\nSélectionnez la catégorie de votre ticket ci-dessous pour créer un nouveau ticket.'
  };
}

function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

module.exports = {
  customId: 'edit_panel_message_modal',
  async execute(interaction) {
    const config = loadConfig();
    const newMessage = interaction.fields.getTextInputValue('panel_message_input');

    config.panelMessage = newMessage;
    saveConfig(config);

    interaction.reply({
      content: `✅ Message du panel modifié!\n\nNouveaux message:\n"${newMessage}"`,
      ephemeral: true
    });
  }
};