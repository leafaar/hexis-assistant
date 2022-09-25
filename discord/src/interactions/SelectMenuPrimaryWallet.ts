import { Interaction } from "discord.js";
import { HexisAssistant } from "..";
import { Collection, User } from "../database/schemas";
import { ApplicationErrorReply, changePrimaryWalletSuccessReply, notRegisteredErrorReply } from "../models/Replys";

export async function SelectMenuPrimaryWallet(
    this: HexisAssistant,
    interaction: Interaction
) {
    if(!interaction.isSelectMenu()) return;
    if(interaction.customId === "manage-wallets:update-primary-wallet:select-menu"){
        try {
            // Verify if the user exist in the db
            const existingUser = await User.findOne({discordId: interaction.user.id});
            if(!existingUser){
                await interaction.reply(notRegisteredErrorReply());
                return;
            }
            // Verify if the user have any wallet
            const userWallets = existingUser.wallets;
            if(Array.isArray(userWallets) && userWallets.length == 0){
                await interaction.reply(notRegisteredErrorReply());
                return;
            }
            const existingCollection = await Collection.findOne({ guildID: interaction.guild?.id });
            if(!existingCollection){
                await interaction.reply(ApplicationErrorReply("The collection isn't configured."));
                console.log("Error, this collection doesn't exist.")
                return;
            }

            // Remove the wallet from db
            const primaryWallet = existingUser.userCollection.find(uc => uc.guildID === interaction.guild?.id);
            await User.updateOne({id: existingUser.id, "userCollection.guildID": primaryWallet?.guildID}, {$set: { "userCollection.$.primaryWallet": interaction.values[0]}});
            await interaction.reply(changePrimaryWalletSuccessReply(interaction.values[0]))
        } catch (error) {
            console.log(`${interaction.guild?.name}: Ocurred an error trying to interact with the 'Update Primary Wallet Button': ${error}`);
            await interaction.reply(ApplicationErrorReply("Unknown error."));
            return;
        }
    }
}