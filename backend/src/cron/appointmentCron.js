import cron from "node-cron";
import { execute } from "../config/db.oracle.js";

// chạy mỗi phút
export const startAppointmentCron = () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("⏰ Running appointment expire job...");

      const result = await execute(
        `UPDATE app.appointments
        SET status = 'cancelled'
        WHERE status = 'pending'
        AND expired_at < SYSTIMESTAMP`,
        {},
        { autoCommit: true } 
        );

      console.log(`✅ Expired updated: ${result.rowsAffected}`);
    } catch (err) {
      console.error("❌ Cron error:", err);
    }
  });
};