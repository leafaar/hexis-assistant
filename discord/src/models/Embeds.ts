import { MessageEmbed } from "discord.js";

export const verifyWaitMessage = new MessageEmbed()
      .setColor('#ffffff')
      .setTitle("Wait")
      .setDescription(`
      Please wait some seconds, we are verifying...
      `)
      .setFooter({ text: 'hexis', iconURL: 'https://pbs.twimg.com/profile_images/1507456623010320393/jhr31cSK_400x400.png' });
