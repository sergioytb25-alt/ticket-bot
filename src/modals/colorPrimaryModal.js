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

function isValidHexColor(hex) {
  return /^#[0-9A-F]{6}$/i.test(hex);
}

module.exports = {
  customId: 'color_primary_modal',
  async execute(interaction) {
    const config = loadConfig();
    const color = interaction.fields.getTextInputValue('color_input');

    if (!isValidHexColor(color)) {
      return interaction.reply({
        content: '❌ Format invalide! Utilisez le format #RRGGBB (ex: #5865F2)',
        ephemeral: true
      });
    }

    config.colors.primary = color;
    saveConfig(config);

    interaction.reply({
      content: `✅ Couleur primaire modifiée en ${color}!`,
      ephemeral: true
    });
  }
};