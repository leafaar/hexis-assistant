import { User } from '../../database/schemas'

export async function getWalletsService(id: string) {
    const user = await User.findById(id);
    if(!user) throw new Error('No user found');
    if(!user.wallets) throw new Error('No wallets found');
    return user.wallets;
}

export async function addWalletService(discordId: string, wallet: string) {
    const user = await User.findOne({discordId});
    const anotherUser = await User.findOne({ wallets: { $all : [wallet] } });
    if(anotherUser){
        if(anotherUser.discordId !== discordId){
            throw new Error('Someone already registered this wallet.');
        }
    }
    if(!user) throw new Error('No user found');
    if(user.wallets.length === 3) throw new Error('You reach the max amount of wallets. (3)');
    if(!user.wallets.some(walletDB => walletDB === wallet)){
        const existingUser = await User.findOneAndUpdate({discordId}, {$push: {wallets: wallet}},{safe: true, upsert: true});
        if(!existingUser) throw new Error('No user found');
        await existingUser?.save();
    }else{
       throw new Error('You already registered this wallet.'); 
    }
}