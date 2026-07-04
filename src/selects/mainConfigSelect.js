const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
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

function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

module.exports = {
  customId: 'main_config_select',
  async execute(interaction) {
    const config = loadConfig();
    const value = interaction.values[0];

    if (value === 'manage_buttons') {
      const buttonMenu = new StringSelectMenuBuilder()
        .setCustomId('manage_buttons_select')
        .setPlaceholder('Gérer les boutons du panel')
        .setMinValues(1)
        .setMaxValues(config.allAvailableButtons.length)
        .addOptions(config.allAvailableButtons.map(btn => ({
          label: btn.label,
          value: btn.name,
          emoji: btn.emoji,
          default: config.panelButtons.some(pb => pb.name === btn.name)
        })));

      const row = new ActionRowBuilder().addComponents(buttonMenu);
      return interaction.reply({
        content: '🔘 Sélectionnez les boutons que vous voulez dans le panel:',
        components: [row],
        ephemeral: true
      });
    }

    if (value === 'add_custom_button') {
      const modal = new ModalBuilder()
        .setCustomId('add_custom_button_modal')
        .setTitle('Ajouter un bouton personnalisé');

      const labelInput = new TextInputBuilder()
        .setCustomId('button_label')
        .setLabel('Nom du bouton')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(100)
        .setRequired(true);

      const emojiInput = new TextInputBuilder()
        .setCustomId('button_emoji')
        .setLabel('Emoji du bouton')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(10)
        .setRequired(true);

      const nameInput = new TextInputBuilder()
        .setCustomId('button_name')
        .setLabel('ID du bouton (sans espaces)')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(50)
        .setRequired(true);

      const row1 = new ActionRowBuilder().addComponents(labelInput);
      const row2 = new ActionRowBuilder().addComponents(emojiInput);
      const row3 = new ActionRowBuilder().addComponents(nameInput);
      modal.addComponents(row1, row2, row3);

      return interaction.showModal(modal);
    }

    if (value === 'edit_panel_message') {
      const modal = new ModalBuilder()
        .setCustomId('edit_panel_message_modal')
        .setTitle('Modifier le message du panel');

      const messageInput = new TextInputBuilder()
        .setCustomId('panel_message_input')
        .setLabel('Message du panel')
        .setStyle(TextInputStyle.Paragraph)
        .setValue(config.panelMessage)
        .setMaxLength(2000);

      const row = new ActionRowBuilder().addComponents(messageInput);
      modal.addComponents(row);

      return interaction.showModal(modal);
    }

    if (value === 'color_primary') {
      const modal = new ModalBuilder()
        .setCustomId('color_primary_modal')
        .setTitle('Modifier la couleur primaire');

      const colorInput = new TextInputBuilder()
        .setCustomId('color_input')
        .setLabel('Couleur (hex format: #RRGGBB)')
        .setStyle(TextInputStyle.Short)
        .setValue(config.colors.primary);

      const row = new ActionRowBuilder().addComponents(colorInput);
      modal.addComponents(row);

      return interaction.showModal(modal);
    }

    if (value === 'color_success') {
      const modal = new ModalBuilder()
        .setCustomId('color_success_modal')
        .setTitle('Modifier la couleur de succès');

      const colorInput = new TextInputBuilder()
        .setCustomId('color_input')
        .setLabel('Couleur (hex format: #RRGGBB)')
        .setStyle(TextInputStyle.Short)
        .setValue(config.colors.success);

      const row = new ActionRowBuilder().addComponents(colorInput);
      modal.addComponents(row);

      return interaction.showModal(modal);
    }

    if (value === 'color_error') {
      const modal = new ModalBuilder()
        .setCustomId('color_error_modal')
        .setTitle('Modifier la couleur d\'erreur');

      const colorInput = new TextInputBuilder()
        .setCustomId('color_input')
        .setLabel('Couleur (hex format: #RRGGBB)')
        .setStyle(TextInputStyle.Short)
        .setValue(config.colors.error);

      const row = new ActionRowBuilder().addComponents(colorInput);
      modal.addComponents(row);

      return interaction.showModal(modal);
    }

    if (value === 'color_warning') {
      const modal = new ModalBuilder()
        .setCustomId('color_warning_modal')
        .setTitle('Modifier la couleur d\'avertissement');

      const colorInput = new TextInputBuilder()
        .setCustomId('color_input')
        .setLabel('Couleur (hex format: #RRGGBB)')
        .setStyle(TextInputStyle.Short)
        .setValue(config.colors.warning);

      const row = new ActionRowBuilder().addComponents(colorInput);
      modal.addComponents(row);

      return interaction.showModal(modal);
    }

    if (value === 'color_info') {
      const modal = new ModalBuilder()
        .setCustomId('color_info_modal')
        .setTitle('Modifier la couleur info');

      const colorInput = new TextInputBuilder()
        .setCustomId('color_input')
        .setLabel('Couleur (hex format: #RRGGBB)')
        .setStyle(TextInputStyle.Short)
        .setValue(config.colors.info);

      const row = new ActionRowBuilder().addComponents(colorInput);
      modal.addComponents(row);

      return interaction.showModal(modal);
    }

    if (value === 'preview_config') {
      const embed = new EmbedBuilder()
        .setColor(config.colors.primary)
        .setTitle('⚙️ Configuration Actuelle')
        .addFields(
          { name: '🔘 Boutons du Panel', value: config.panelButtons.map(b => `${b.emoji} ${b.label}`).join('\n'), inline: true },
          { name: '💬 Message', value: config.panelMessage, inline: false },
          { name: '🎨 Couleur Primaire', value: config.colors.primary, inline: true },
          { name: '✅ Couleur Succès', value: config.colors.success, inline: true },
          { name: '❌ Couleur Erreur', value: config.colors.error, inline: true },
          { name: '⚠️ Couleur Avertissement', value: config.colors.warning, inline: true },
          { name: 'ℹ️ Couleur Info', value: config.colors.info, inline: true }
        );

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
};