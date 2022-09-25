import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ObjectId } from "mongodb";
import { HexisAssistant } from "..";
import { verificationRow } from "../components/actionRows";
import { Collection, Key } from "../database/schemas";
import { collectorButtons } from "../utils/collector";
import { registerCollections } from "../utils/registerCollections";

export default {
  data: new SlashCommandBuilder()
    .setName("hexis-configure")
    .setDescription("Configures the hexis verification bot")
    .setDefaultPermission(false)
    .addStringOption((option) => 
      option
        .setName("contract-address")
        .setDescription("select the update authority address.")
        .setRequired(true)
    )
    .addRoleOption((option) => 
        option
          .setName("role")
          .setDescription("select role that will be given for the verified users.")
          .setRequired(true)
    )
    .addStringOption((option) => 
        option
          .setName("key")
          .setDescription("paste the collection key")
          .setRequired(true)
    ),
  execute: async (
    hexisAsistant: HexisAssistant,
    interaction: CommandInteraction,
  ) => {
    // verify the interaction is valid
    if (!interaction.guildId || !interaction.guild || !interaction.member)
      return;

    const contractAddress = interaction.options.getString("contract-address")?.toLowerCase() || "";
    const role = interaction.options.getRole("role");
    const channel = interaction.channel;
    const key = interaction.options.getString("key") || "";
    if(key.length != 24){
      await interaction.reply({
        content: `Key is invalid.`,
        ephemeral: true,
      });
      return;
    }
    if(contractAddress.length != 44) {
      await interaction.reply({
        content: "Invalid UpdateAuthority address.",
        ephemeral: true,
      });
      return;
    }

    // Here if you want just staffs to use the command in the servers.
    // const allowedUsers = [
    //   "261362856954429440",
    //   "253238047598968834"
    // ];
    // if(!allowedUsers.includes(interaction.member?.user.id)){
    //     await interaction.reply({
    //         content: `Oops... looks like you don't have permissions for that.`,
    //         ephemeral: true,
    //       });
    //     return;
    // }
    try {
      const existingKey = await Key.findById(new ObjectId(key));
      if(!existingKey){
        await interaction.reply({
          content: `The key: ${key} is invalid.`,
          ephemeral: true,
        });
        return;
      }
      if(existingKey.guildID !== interaction.guild.id){
        await interaction.reply({
          content: `The key: ${key} is invalid.`,
          ephemeral: true,
        });
        return;
      }
      const existingCollection = await Collection.findOne({ guildID: interaction.guild.id });
      if(existingCollection){
        await interaction.reply({
          content: `This collection was already configured. If you want to edit something, please contact some of the hexis staff.\n\nID: ${existingCollection.guildID}`,
          ephemeral: true,
        });
        return;
      }
      const confirmButton = new MessageButton()
      .setCustomId('configure:confirm')
      .setLabel('Confirm')
      .setStyle('SUCCESS')
      const cancelButton = new MessageButton()
      .setCustomId('configure:cancel')
      .setLabel('Cancel')
      .setStyle('DANGER')
      const row = new MessageActionRow()
      .addComponents(confirmButton, cancelButton);
      const embed = new MessageEmbed()
      .setColor('#ffffff')
      .setTitle("Confirm that the following data is correct.")
      .addFields(
        { name: 'Contract address: ', value:contractAddress },
        { name: 'Role: ', value: `${role}` },
        { name: 'Channel: ', value: `${channel}` },
        { name: 'Key: ', value: `${key}` },
      )
      .setTimestamp()
      .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });

      const embedVerification = new MessageEmbed()
      .setColor('#ffffff')
      .setTitle("Verify yourself")
      .setDescription(`
      \n
      :white_small_square: To verify your account, simply click the **"Link your wallet"** button bellow, and connect your wallet with hexis.
      \n
      :white_small_square: The NFT must stay in your account.
      \n
      :white_small_square: You can always generate a new link to re-verify your account.
      \n
      `)
      .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });
      await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: true,
      });
      const collector = collectorButtons(interaction);
      collector?.on("collect", async collected => {
        if(collected.user.id === interaction.user.id){
          if(collected.customId === "configure:confirm"){
            await interaction.editReply({ content: 'Success!', components: [], embeds: [] });
            const message = await interaction.channel?.send({ embeds: [embedVerification], components: [verificationRow] });
            await registerCollections(interaction.guild!, new ObjectId(key), channel?.id as string, message?.id as string, role?.id as string, contractAddress);
          }else if(collected.customId === "configure:cancel"){
            await interaction.editReply({ content: 'Canceled.', components: [], embeds: [] });
          }
        }
      })
    } catch (error) {
      console.log(`Error during trying to register a new collection. ${error}`);
      await interaction.reply({
        content: `We got some error, please contact a administrator of hexis.`,
        ephemeral: true,
      });
    }
  },
};
