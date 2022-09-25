import { GuildMember, Interaction } from "discord.js";
import { HexisAssistant } from "..";
import { Collection, User } from "../database/schemas";
import { UserCollection } from "../database/schemas/User";
import { alreadyDeletedWalletReply, ApplicationErrorReply, deleteWalletSuccessReply, notRegisteredErrorReply } from "../models/Replys";
import { haveNFT } from "../scripts/haveNFT";

export async function SelectMenuDeleteWallet(
    this: HexisAssistant,
    interaction: Interaction
) {
    if(!interaction.isSelectMenu()) return;
    if(interaction.customId === "manage-wallets:delete-wallet:select-menu"){
        try {
            // Verify if the user exist in the DB
            const existingUser = await User.findOne({discordId: interaction.user.id});
            if(!existingUser){
                await interaction.reply(notRegisteredErrorReply());
                return;
            }
            // Verify if the user have any wallets
            const userWallets = existingUser.wallets;
            if(Array.isArray(userWallets) && userWallets.length == 0){
                await interaction.reply(notRegisteredErrorReply());
                return;
            }
            const existingCollection = await Collection.findOne({ guildID: interaction.guild?.id });
            if(!existingCollection){
                await interaction.reply(ApplicationErrorReply("The collection isn't configured."));
                console.log("Error, this collection doesn't exists.")
                return;
            }
            if(!existingUser.wallets.includes(interaction.values[0])){
                await interaction.reply(alreadyDeletedWalletReply());
                console.log(`${interaction.guild?.name}: Ocorreu um erro ao tentar deletar a wallet de um usuario, aparentemente a wallet NÃO EXISTE.`)
                return;
            }

            // Verify first if have the role.
            const member = interaction.member as GuildMember;
            const hasRole = member.roles.cache.find(r => r.id === existingCollection.roleID) ? true : false;
            let permissionError = false;
            if(hasRole){
                if(Array.isArray(existingUser.wallets) && existingUser.wallets.length > 0){
                    await member.roles.remove(existingCollection.roleID).catch((error: Error) => {
                        permissionError = true;
                    });
                }
            }
            if(permissionError) {
                await interaction.reply(ApplicationErrorReply("Insufficient permissions to remove the role, please contact a staff."));
                console.log(`${interaction.guild?.name}: Error, trying to remove the role, but insufficient permissions.`)
                return;
            }
            // Remove wallet from DB.
            const primaryWallet = existingUser.userCollection.find(uc => uc.guildID === interaction.guild?.id);
            if(primaryWallet?.primaryWallet === interaction.values[0]){
                const updatedUser = await User.findOneAndUpdate({discordId: interaction.user.id}, {$pull: { wallets: interaction.values[0], userCollection: primaryWallet }});
                await updatedUser?.save();
            } else {
                const updatedUser = await User.findOneAndUpdate({discordId: interaction.user.id}, {$pull: { wallets: interaction.values[0]}});
                await updatedUser?.save();
            }
            await interaction.reply(deleteWalletSuccessReply(interaction.values[0]))
        } catch (error) {
            console.log(`${interaction.guild?.name}: Ocurred an error trying to interact with the 'Delete Wallets Button': ${error}`);
            await interaction.reply(ApplicationErrorReply("Unknown error."));
            return;
        }
    }
}