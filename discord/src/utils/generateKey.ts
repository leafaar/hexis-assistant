import { Key } from "../database/schemas";

export const generateKey = async (guildID: string, guildName: string, createdAt: Date, endAt: Date) => {
    console.log(`Generating a key for: ${guildName}`);
    try {
        const newKey = new Key({ guildID, guildName, createdAt, endAt });
        const savedCollection = await newKey.save();
        return savedCollection;
    } catch (error) {
        console.log(`We got some error during the creating a new key: ${error}`);
    }
}