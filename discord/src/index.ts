import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import { registerCommands } from "./utils/registerCommands";
import { interactionHandler } from "./utils/interactionHandler";
import './database';
import { Verify } from "./interactions/Verify";
import { runDailyVerification } from "./verificator/runDailyVerification";
import { updateRoles } from "./verificator/updateRoles";
import { DeleteWallets } from "./interactions/replys/DeleteWallets";
import { ManageWallets } from "./interactions/replys/ManageWallets";
import { UpdatePrimaryWallet } from "./interactions/replys/UpdatePrimaryWallet";
import { SelectMenuDeleteWallet } from "./interactions/SelectMenuDeleteWallet";
import { SelectMenuPrimaryWallet } from "./interactions/SelectMenuPrimaryWallet";
config();

export class HexisAssistant {
    client: Client;


    // define functions
    public interactionHandler = interactionHandler;
    public verify = Verify;
    public ManageWallets = ManageWallets;
    public SelectMenuDeleteWallet = SelectMenuDeleteWallet;
    public SelectMenuPrimaryWallet = SelectMenuPrimaryWallet;
    public runDailyVerification = runDailyVerification;
    public updateRoles = updateRoles; 
    public DeleteWallets = DeleteWallets;
    public UpdatePrimaryWallet = UpdatePrimaryWallet;
    constructor(){
        // Create a new client instance
        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });


    }

    async registerGuildCommands(){
        for (const guild of this.client.guilds.cache.values()) {
            console.log(`Registering commands for ${guild.name}`);
            try {
               await registerCommands(guild);
            } catch (error) {
                console.error(`Couldn't register commands for ${guild.name}`);
                let err = error as Error;
                console.error(err.message);
            }
            await new Promise((r) => setTimeout(r, 1000));
        }
    }


    start(
        onReady: (hexisAssistantBot: HexisAssistant) => void,
        runSyncProcesses: boolean,
        handleInteractions: boolean
    ) {
        this.client.once("ready", () => {
            // Register commands for all servers
            this.registerGuildCommands();
            // this.collectionVerify();
            // Connect to the DB
            // this.connectDB();


            if(runSyncProcesses){
                this.runDailyVerification();
            }


            onReady(this);
        });

        if (handleInteractions) {
            // When the bot is added to a server, configure the slash commands
            this.client.on("guildCreate", registerCommands);
            // this.client.on("guildCreate", registerCollections);

      
            // Handle slash command interactions
            this.client.on("interactionCreate", (interaction) =>
              this.interactionHandler(interaction)
            );
            // Verify interaction button
            this.client.on("interactionCreate", (interaction) =>
                this.verify(interaction)
            );
            //Manage wallets interaction button
            this.client.on("interactionCreate", (interaction) =>
                this.ManageWallets(interaction)
            );
            //Delete wallet interaction select menu
            this.client.on("interactionCreate", (interaction) =>
                this.SelectMenuDeleteWallet(interaction)
            );
            //Delete wallet interaction button
            this.client.on("interactionCreate", (interaction) =>
                this.DeleteWallets(interaction)
            );
            //Update primary wallet interaction button
            this.client.on("interactionCreate", (interaction) =>
                this.UpdatePrimaryWallet(interaction)
            );            
            //Update primary wallet interaction select menu
            this.client.on("interactionCreate", (interaction) =>
                this.SelectMenuPrimaryWallet(interaction)
            );
          }

        this.client.on("rateLimit", (data) => {
            console.log("Getting rate limited.");
            console.log(JSON.stringify(data));
        });

        // start discord bot
        this.client.login(process.env.DISCORD_TOKEN);
    }
}

const hexisAssistantBot = new HexisAssistant();

// start the hexis assistant bot
hexisAssistantBot.start(
    () => {
        console.log("Ready!");
    },
    true,
    true,
);
