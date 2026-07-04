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
      { name: 'appeal', label: 'Appel', emoji: '⚔️' },
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
      { name: 'appeal', label: 'Appel', emoji: '⚔️' },
      { name: 'partnership', label: 'Partenariat', emoji: '🤝' }
    ],
    panelMessage: '**🎫 Système de Tickets**\n\nSélectionnez la catégorie de votre ticket ci-dessous pour créer un nouveau ticket.',
    allAvailableButtons: [
      { name: 'support', label: 'Support', emoji: '🆘' },
      { name: 'report', label: 'Signalement', emoji: '📋' },
      { name: 'appeal', label: 'Appel', emoji: '⚔️' },
      { name: 'partnership', label: 'Partenariat', emoji: '🤝' },
      { name: 'bug', label: 'Signaler un Bug', emoji: '🐛' },
      { name: 'suggestion', label: 'Suggestion', emoji: '💡' },
      { name: 'feedback', label: 'Feedback', emoji: '📝' },
      { name: 'other', label: 'Autre', emoji: '📞' }
    ]
  };
}

module.exports = {
  customId: 'panel_channel_select',
  async execute(interaction) {
    const selectedChannel = interaction.values[0];
    const channel = interaction.guild.channels.cache.get(selectedChannel);

    if (!channel) {
      return interaction.reply({ content: '❌ Salon non trouvé!', ephemeral: true });
    }

    try {
      const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
      const config = loadConfig();

      const embed = new EmbedBuilder()
        .setColor(config.colors.primary)
        .setTitle('🎫 Système de Tickets')
        .setDescription(config.panelMessage)
        .addFields(...config.panelButtons.map(cat => ({
          name: `${cat.emoji} ${cat.label}`,
          value: `Crée un ticket ${cat.label.toLowerCase()}`,
          inline: true,
        })))
        .setFooter({ text: 'Utilisez le menu déroulant pour sélectionner une catégorie' });

      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('ticket_category_select')
        .setPlaceholder('Choisir une catégorie...')
        .addOptions(config.panelButtons.map(cat => ({
          label: cat.label,
          value: cat.name,
          emoji: cat.emoji,
          description: `Créer un ticket ${cat.label.toLowerCase()}`
        })));

      const row = new ActionRowBuilder().addComponents(selectMenu);

      await channel.send({ embeds: [embed], components: [row] });
      await interaction.reply({ content: `✅ Panel envoyé dans ${channel}!`, ephemeral: true });
    } catch (error) {
      console.error('Panel send error:', error);
      await interaction.reply({ content: '❌ Erreur lors de l\'envoi du panel! ' + error.message, ephemeral: true });
    }
  }
};