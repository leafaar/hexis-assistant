import { ButtonInteraction, Interaction, Message, SelectMenuInteraction, User } from "discord.js";

const filterButton = (user: User) => {
    return (i: ButtonInteraction) => {
        i.deferUpdate();
        return i.user.id == user.id;
    }
};
const filterSelectMenu = (user: User) => {
    return (i: SelectMenuInteraction) => {
        i.deferUpdate();
        return i.user.id == user.id;
    }
};
const collectorSelectMenus = (interaction: Interaction) => {
    return interaction.channel?.createMessageComponentCollector({
        componentType: "SELECT_MENU",
        filter: filterSelectMenu(interaction.user),
        time: 15000,
        //max: 1
    });
}
const collectorButtons = (interaction: Interaction) => {
    return interaction.channel?.createMessageComponentCollector({
        componentType: "BUTTON",
        filter: filterButton(interaction.user),
        time: 15000,
        //max: 1
    });
}
export {
    filterButton,
    collectorButtons,
    collectorSelectMenus,
    filterSelectMenu
};