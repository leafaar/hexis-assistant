import { Collection, Interaction } from "discord.js";
import { SlashCommandData } from "../types";
import { commandFiles } from "./commandsFiles";
import path from "path";
import { HexisAssistant } from "..";


// Create a collection for the command handles
const commandHandlers = new Collection<string, SlashCommandData>();

// Populate the command handles
for(const file of commandFiles) {
    const commandFilePath = path.resolve(__dirname, `../commands/${file}`);
    const command = require(commandFilePath).default;

    // Set a new item in the collection
    // With the key as the command name and the value as the exported module
    commandHandlers.set(command.data.name, command);
}

export async function interactionHandler(
    this: HexisAssistant,
    interaction: Interaction
) {
    if(!interaction.isCommand()) return;

    // get the command handler
    const command = commandHandlers.get(interaction.commandName);

    if(!command) return;

    // try to run the command handler
    try {
        await command.execute(this, interaction);
    } catch (error) {
        console.log(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
    }
}