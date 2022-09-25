import { GuildMember, Interaction } from "discord.js";
import { HexisAssistant } from "..";
import { Collection, User } from "../database/schemas";
import { UserCollection } from "../database/schemas/User";
import { ApplicationErrorReply, notRegisteredErrorReply, verifyReply } from "../models/Replys";
import { haveNFT } from "../scripts/haveNFT";

export async function Verify(
    this: HexisAssistant,
    interaction: Interaction
) {
    if(!interaction.isButton()) return;
    try {
        if(interaction.customId === "verify:check-status"){

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

            // Verify if the "collection" exist in the db
            const collection = await Collection.findOne({guildID: interaction.guild?.id});
            if(!collection){
                await interaction.reply(ApplicationErrorReply("The collection isn't configured."));
                console.log("Collection doesn't exist")
                return;
            }
            // Verify if the user has any wallet inside the collection
            // If doesn't already have primary wallet, create one.
            const primaryWallet = existingUser.userCollection.find(uc => uc.guildID === interaction.guild?.id);
            if(!primaryWallet){
                const userCollection: UserCollection = { guildID: interaction.guild?.id as string, primaryWallet: userWallets[0] }
                const updateUser = await User.findOneAndUpdate({ discordId: interaction.user.id }, {$push: { userCollection: userCollection }}, {safe: true, upsert: true});
                await updateUser?.save();

                // Verify if it have any NFT
                const hasNft = await haveNFT(collection.contract, userWallets[0] as string);
                const member = interaction.member as GuildMember;
                let permissionError = false;

                // Try to give the role
                if(!hasNft) {
                    await interaction.reply(verifyReply(userWallets[0] as string, userWallets, hasNft));
                    return;
                }
                await member.roles.add(collection.roleID).catch((error: Error) => {
                    permissionError = true;
                });

                // Verify if have any erros
                if(permissionError) {
                    await interaction.reply(ApplicationErrorReply("Insufficient permissions to give the role, please contact a staff."));
                    console.log(`${interaction.guild?.name}: Error trying to give the role: insufficient permissions.`)
                    return;
                }
                await interaction.reply(verifyReply(userWallets[0] as string, userWallets, hasNft));
                return;
            }

            // Verify if the user has any wallet inside the collection (existing primary wallet)
            const hasNft = await haveNFT(collection.contract, primaryWallet?.primaryWallet as string);
            const member = interaction.member as GuildMember;
            let permissionError = false;

            // Try to give the role
            if(!hasNft) {
                await interaction.reply(verifyReply(userWallets[0] as string, userWallets, hasNft));
                return;
            }
            await member.roles.add(collection.roleID).catch((error: Error) => {
                permissionError = true;
            });

            // Verify if have any erros
            if(permissionError) {
                await interaction.reply(ApplicationErrorReply("Insufficient permissions to give the role, please contact a staff."));
                console.log(`${interaction.guild?.name}: Error trying to give the role: insufficient permissions.`)
                return;
            }
            await interaction.reply(verifyReply(primaryWallet?.primaryWallet as string, userWallets, hasNft));
        }
    } catch (error) {
        console.log(error);
        await interaction.reply(ApplicationErrorReply("Unknown error."));
        return;
    }
}

