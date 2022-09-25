import { Guild } from "discord.js";
import { Collection } from "../database/schemas";

export const getCollection = async (guild: Guild) => {
    try {
        const collection = await Collection.findOne({ guildID: guild.id });
        return collection;
    } catch (error) {
        console.log("Error trying to get a collection. ", error);
    }
}