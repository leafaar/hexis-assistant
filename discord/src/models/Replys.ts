import { MessageEmbed } from "discord.js";
import { manageWalletButton, manageWalletRow, selectMenuRow, updateWalletSelectMenu } from "../components/actionRows";

export const ApplicationErrorReply = (error: string) => {
    const embed =  new MessageEmbed()
        .setColor('#FF0000')
        .setTitle("Verification status")
        .setDescription(`
            :x: The application **found an error**, please contact the staff.
            
            *Error: **${error}***
        `)
        .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });
    return { embeds: [embed], ephemeral: true };
}

export const notRegisteredErrorReply = () => {
    const embed =  new MessageEmbed()
        .setColor('#FF0000')
        .setTitle("Verification status")
        .setDescription(`
            :x: Your wallet **is not registered**.
            
            *Please click the **Link your wallet** button to verify your account.*
        `)
        .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });
    return { embeds: [embed], ephemeral: true };
}

export const alreadyDeletedWalletReply = () => {
    const embed =  new MessageEmbed()
        .setColor('#FF0000')
        .setTitle("Delete wallet status")
        .setDescription(`
            :x: Your wallet **is already deleted** in the hexis application.
            
            *Please click the **Link your wallet** button to verify your account.*
        `)
        .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });
    return { embeds: [embed], ephemeral: true, components: [] };
}
export const deleteWalletSuccessReply = (wallet: string) => {
    let walletSlice = wallet.slice(0, 4);
    let walletSlice2 = wallet.slice(40, 44);
    let walletStr = walletSlice + "..." + walletSlice2;
    const embed =  new MessageEmbed()
        .setColor('#57F288')
        .setTitle("Delete wallet status")
        .setDescription(`
            :white_check_mark: Your wallet **${walletStr}** is now deleted.
        `)
        .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });
    return { embeds: [embed], ephemeral: true, components: [] };
}

export const changePrimaryWalletSuccessReply = (wallet: string) => {
    let walletSlice = wallet.slice(0, 4);
    let walletSlice2 = wallet.slice(40, 44);
    let walletStr = walletSlice + "..." + walletSlice2;
    const embed =  new MessageEmbed()
        .setColor('#57F288')
        .setTitle("Change primary wallet status")
        .setDescription(`
            :white_check_mark: Your primary wallet now is: **${walletStr}**.
        `)
        .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });
    return { embeds: [embed], ephemeral: true, components: [] };
}

export const reduceWallet = (wallet: string) => {
    let walletSlice = wallet.slice(0, 4);
    let walletSlice2 = wallet.slice(40, 44);
    let walletStr = walletSlice + "..." + walletSlice2;
    return walletStr;
}

export const verifyReply = (primaryWallet: string, wallets: string[], nftNum: any) => {
    let walletsArr = [];
    for(const wallet in wallets){
        if(wallets[wallet] != primaryWallet){
            let walletStr = reduceWallet(wallets[wallet]);
            walletsArr.push(`${walletStr}`);
        }
    }
    let walletStr = reduceWallet(primaryWallet);
    if(!nftNum) nftNum = 0;
    var walletsNames = wallets.length == 1 ? `**${walletStr}**` : `**${walletStr}**\n` + walletsArr.join('\n');
    const embed =  new MessageEmbed()
        .setColor('#57F288')
        .setTitle("Verification status")
        .setDescription(`
            :white_check_mark: You are verified with hexis.
            \u200b
        `)
        .addFields(
            { name: "Wallets", value: walletsNames, inline: true},
            { name: "NFTs found", value: `${nftNum}`, inline: true}
        )
        .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });
    return { embeds: [embed], ephemeral: true , components: [manageWalletButton]};
}

export const deleteWalletReply = (wallets: string[]) => {
    let walletsArr = [];
    for(const wallet in wallets){
        let walletStr = reduceWallet(wallets[wallet]);
        let newOptions: options = {label: walletStr, value: wallets[wallet]}
        walletsArr.push(newOptions);
    }
    const embed =  new MessageEmbed()
        .setColor('#FF0000')
        .setTitle("Delete account wallet")
        .setDescription(`
            :exclamation: This will **permanently** delete this wallet from your account and remove it from **all** hexis servers.

            *You can add this wallet back by linking again your wallet using the **"Link your wallet"** button.*
        `)
        .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });
    return { embeds: [embed], ephemeral: true , components: [selectMenuRow(walletsArr)]};
}

export const updatePrimaryWalletReply = (primaryWallet: string, wallets: string[]) => {
    let walletsArr = [];
    for(const wallet in wallets){
        if(wallets[wallet] != primaryWallet){
            let walletStr = reduceWallet(wallets[wallet]);
            let newOptions: options = {label: walletStr, value: wallets[wallet]}
            walletsArr.push(newOptions);
        }
    }
    const embed =  new MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle("Update primary wallet")
        .setDescription(`
            Select a new **primary wallet** for this Discord server.

            Current primary wallet: **${reduceWallet(primaryWallet)}**
            \u200b
        `)
        .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });
    return { embeds: [embed], ephemeral: true , components: [updateWalletSelectMenu(walletsArr)]};
}

export interface options{
    label: string;
    value: string;
}
export const manageWalletsReply = (primaryWallet: string, wallets: string[]) => {
    let walletsArr = [];
    for(const wallet in wallets){
        if(wallets[wallet] != primaryWallet){
            let walletStr = reduceWallet(wallets[wallet]);
            walletsArr.push(`${walletStr}`);
        }
    }
    let walletStr = reduceWallet(primaryWallet);
    var walletsNames = wallets.length == 1 ? `**${walletStr}**` : `**${walletStr}**\n` + walletsArr.join('\n');
    const embed =  new MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle("Wallet management")
        .setDescription(`
            :tools: Your **primary wallet** for this Discord Server is the first highlighted wallet in the wallet list below.

            :repeat: You can change your primary wallet for this server pressing the **"Update Primary Wallet"** button below.
        
            :exclamation: To remove wallets from your account, use the **"Delete Wallets"** button.
            \u200b
        `)
        .addFields(
            { name: "Wallets", value: walletsNames, inline: true},
        )
        .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });
    return { embeds: [embed], ephemeral: true , components: [manageWalletRow(wallets)]};
}