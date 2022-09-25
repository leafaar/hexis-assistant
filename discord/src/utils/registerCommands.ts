import { Guild } from "discord.js";
import { commandFiles } from "./commandsFiles";
import path from "path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { config } from "dotenv";
config();

export const registerCommands = async (guild: Guild) => {

    //It will just register the command /generate-key in the guild ID discord server.
    // The command is for you generate a key that will be used in the /hexis-configure command.
    let newCommands: any = [];
    commandFiles.forEach((file) => {
        if(file === "generate-key.ts" || file === "generate-key.js"){
            if(guild.id === "guild-id HERE"){
                const commandFilePath = path.resolve(__dirname, `../commands/${file}`);
                const command = require(commandFilePath).default;
                newCommands.push(command.data.toJSON());  
            }
        }else{
            const commandFilePath = path.resolve(__dirname, `../commands/${file}`);
            const command = require(commandFilePath).default;
            newCommands.push(command.data.toJSON());  
        }
    });
    console.log(newCommands);

    // register the commands
    const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN as string);

    await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID as string, guild.id), {
        body: newCommands,
    });

    console.log(`Successfully registered application commands for ${guild.name}`);

}