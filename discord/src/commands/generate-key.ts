import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { HexisAssistant } from "..";
import { Key } from "../database/schemas";
import { generateKey } from "../utils/generateKey";

export default {
    data: new SlashCommandBuilder()
        .setName("generate-key")
        .setDescription("Generates a key for a specific collection.")
        .setDefaultPermission(false)
        .addStringOption((option) => 
            option
                .setName("guild-id")
                .setDescription("The guild-id from the collection you want to generate the key for.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("guild-name")
                .setDescription("The name of the collection.)")
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("time")
                .setDescription("The time in MONTHS.")
                .setRequired(true)
        ),
    execute: async (
        hexisAssistant: HexisAssistant,
        interaction: CommandInteraction
    ) => {
        if (!interaction.guildId || !interaction.guild || !interaction.member) return;
        const guildID = interaction.options.getString("guild-id") || "";
        const guildName = interaction.options.getString("guild-name") || "";
        const time = interaction.options.getInteger("time");

        // Here if you want just staffs to use the command in the servers.
        // const allowedUsers = [
        //     "user-id",
        //     "user-id"
        // ];
        // if(!allowedUsers.includes(interaction.member?.user.id)){
        //     await interaction.reply({
        //         content: `Oops... looks like you don't have permissions for that.`,
        //         ephemeral: true,
        //       });
        //     return;
        // }
        try {
            const existingKey = await Key.findOne({guildID});
            if(existingKey){
                await interaction.reply({
                    content: `Already exists a key for this collection. ${existingKey.guildName}`,
                    ephemeral: true,
                  });
                return;
            }
            const dateNow = new Date();
            const dateAfter = dateNow;
            dateAfter.setMonth(dateAfter.getMonth() + time!);
            const newKey = await generateKey(guildID, guildName, dateNow, dateAfter);
            const timeStampNow = (Date.now() / 1000).toFixed();
            const timeStampAfter = ((dateAfter as any) / 1000).toFixed();
            await interaction.reply({
                content: `Collection: ${guildName}\nID: ${guildID}\nKey: ${newKey?.id}\nTodays date: <t:${timeStampNow}:f>\nEnd date: <t:${timeStampAfter}:f>\nMonths: ${time}\nRelative time: <t:${timeStampNow}:R>`,
                ephemeral: false
              });
        } catch (error) {
            await interaction.reply({
                content: `An error occurred.`,
                ephemeral: true,
              });
            console.log(`An error occurred trying to register a key for a collection.: ${error}`)
            return;
        }
    },
};