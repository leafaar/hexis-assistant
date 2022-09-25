import { Guild } from "discord.js";
import { ObjectId } from "mongodb";
import { Collection } from "../database/schemas";

export const registerCollections = async (guild: Guild, key: ObjectId, channelID: string, messageID: string, roleID: string, contract: string) => {
    console.log(`Checking the DB for: ${guild.name}`);
    try {
        const existingCollection = await Collection.findOne({ guildID: guild.id });
        if(existingCollection){
            console.log(`${guild.name} is already on the DB`);
            return;
        }
        const newCollection = new Collection({ guildID: guild.id, guildName: guild.name, key, channelID, messageID, roleID, contract });
        await newCollection.save();
    } catch (error) {
        console.log(`We got some error during the collection db verify: ${error}`);
    }
}