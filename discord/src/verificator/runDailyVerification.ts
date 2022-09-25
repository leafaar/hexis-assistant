import { HexisAssistant } from "..";
import cron from "node-cron";

export async function runDailyVerification(this: HexisAssistant) {
    // cronjob to update discord roles once a day
  cron.schedule("0 0 * * *", () => this.updateRoles());
    
}