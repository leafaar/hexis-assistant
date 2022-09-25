import { GuildMember } from "discord.js";
import { HexisAssistant } from "..";
import { Collection, User } from "../database/schemas";
import { haveNFT } from "../scripts/haveNFT";

export async function updateRoles(this: HexisAssistant){
    const startTime = Date.now();
    console.log(
      `Cronjob initializing. Start: ${startTime}`
    );


    const usersSnapshot = await User.find();
    const collectiosSnapshot = await Collection.find();

    const numUsers = usersSnapshot.length;

    usersSnapshot.forEach(async (user, index) => {
      user.userCollection.forEach(async (userCollection) => {
        const collection = collectiosSnapshot.find((col) => col.guildID === userCollection.guildID);
        if(!collection) throw new Error("This collection doesn't exist: ");
        const checkNFT = await haveNFT(collection?.contract, userCollection.primaryWallet);
        if(!checkNFT){
          //remove role
          const guild = this.client.guilds.cache.find((guild) => guild.id == collection.guildID);
          if(!guild) throw new Error('Não foi possível achar esta guild ao executar o cronjob.');
          const member = await guild.members.fetch(user.discordId) as GuildMember;
          console.log(`Removing the user roles: ${member.user.username}`);
          if(!member) throw new Error(`This user doesn't exist.`);
          let permError = false;
          await member.roles.remove(collection.roleID).catch((error: Error) => {
            console.log(`Error trying to remove the user: ${member.id} roles. \nErro: ${error}`);
            permError = true;
          });
          console.log(`Success! Removed the: ${member.user.username} roles.`);
          if(!permError){
            await User.updateOne({id: user.id}, { $pull: { userCollection: userCollection } });
            console.log(`The user ${member.user.username} was removed from db.`);
          }
        }
      });
      if((index+1) === numUsers){
        const endTime = Date.now();
        console.log(
          `Finishing cronjob. Finish: ${endTime}. Time spent: ${endTime - startTime}`
        );
      }
    });
    
    


}