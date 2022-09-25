import { MessageActionRow, MessageButton, MessageSelectMenu } from "discord.js";
import { options, reduceWallet } from "../models/Replys";

export const verifyButtonsRow = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setURL("https://www.hexishq.com/")
            .setLabel("Link your wallet")
            .setStyle("LINK"),
        new MessageButton()
            .setCustomId("verify:verify")
            .setLabel("ℹ️ Check status")
            .setStyle("SUCCESS")
    );

export const verificationRow = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setURL("https://www.hexishq.com/")
            .setLabel("Link your wallet")
            .setStyle("LINK"),
        new MessageButton()
            .setCustomId("verify:check-status")
            .setLabel("ℹ️ Check status")
            .setStyle("PRIMARY")
    );

export const manageWalletButton = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId("manage-wallets")
            .setLabel("Manage wallets")
            .setStyle("PRIMARY")
);
export const manageWalletRow = (wallets: string[]) => {
    if(wallets.length == 1) {
        return new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("manage-wallets:delete-wallets")
                .setLabel("Delete wallets")
                .setStyle("DANGER"),
        );
    } else {
        return new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("manage-wallets:update-primary-wallet")
                .setLabel("Update primary wallet")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("manage-wallets:delete-wallets")
                .setLabel("Delete wallets")
                .setStyle("DANGER"),
        );
    }
}


export const selectMenuRow = (options: options[]) => {
    const selectMenu = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId("manage-wallets:delete-wallet:select-menu")
            .setPlaceholder("Select wallet to delete")
                .addOptions(options)
        );
    return selectMenu;
}
export const updateWalletSelectMenu = (options: options[]) => {
    const selectMenu = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId("manage-wallets:update-primary-wallet:select-menu")
            .setPlaceholder("Select new primary wallet")
                .addOptions(options)
        );
    return selectMenu;
}