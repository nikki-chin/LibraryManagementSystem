import cron from "node-cron";
import { updateOverdueLoans } from "./updateOverdueLoans";

cron.schedule("0 0 * * *", async() => {
    console.log("checking overdue loans...");
    await updateOverdueLoans();
})