import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { HexisAssistant } from "..";

export interface SlashCommandData {
  data: SlashCommandBuilder;
  execute: (
    hexisAsistant: HexisAssistant,
    interaction: CommandInteraction
  ) => Promise<void>;
}