import { Interaction } from "discord.js";
import { HexisAssistant } from "../..";
import { User } from "../../database/schemas";
import { ApplicationErrorReply, notRegisteredErrorReply, updatePrimaryWalletReply } from "../../models/Replys";

export async function UpdatePrimaryWallet(
    this: HexisAssistant,
    interaction: Interaction
) {
    if(!interaction.isButton()) return;
    
    if(interaction.customId === "manage-wallets:update-primary-wallet"){
        try {
            // Verify if the user is in the DB.
             const existingUser = await User.findOne({discordId: interaction.user.id});
             if(!existingUser){
                 await interaction.reply(notRegisteredErrorReply());
                 return;
             }
            // Verifica se o usuario tem wallets
             const userWallets = existingUser.wallets;
             if(Array.isArray(userWallets) && userWallets.length == 0){
                 await interaction.reply(notRegisteredErrorReply());
                 return;
             }
             const primaryWallet = existingUser.userCollection.find(uc => uc.guildID === interaction.guild?.id);
             interaction.reply(updatePrimaryWalletReply(primaryWallet?.primaryWallet as string, userWallets));
        } catch (error) {
            console.log(`${interaction.guild?.name}: Ocurred an error trying to interact with the 'Update Primary Wallet Button': ${error}`);
            await interaction.reply(ApplicationErrorReply("Unknown error."));
            return;
        }
    }

}