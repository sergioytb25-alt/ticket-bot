const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelSelectMenuBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Commandes de tickets')
    .addSubcommand(sub =>
      sub
        .setName('panel')
        .setDescription('Crée un panneau de tickets personnalisé')
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'panel') {
      if (!interaction.member.permissions.has('Administrator')) {
        return interaction.reply({ content: '❌ Permission refusée! (Administrateur seulement)', ephemeral: true });
      }

      const channelSelect = new ChannelSelectMenuBuilder()
        .setCustomId('panel_channel_select')
        .setPlaceholder('Sélectionnez le salon où envoyer le panel');

      const row = new ActionRowBuilder().addComponents(channelSelect);

      return interaction.reply({
        content: '📍 Sélectionnez le salon où vous voulez envoyer le panel de tickets:',
        components: [row],
        ephemeral: true
      });
    }
  }
};
