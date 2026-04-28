import app from "./app.js";
import { initialize } from "./config/db.oracle.js";
import connectDB from "./config/db.mongo.js";
import { startAppointmentCron } from "./cron/appointmentCron.js";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // connect DB
    await initialize();
    await connectDB();

    console.log("Databases connected");

    // start cron SAU khi DB OK
    startAppointmentCron();

    // start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); 
  }
})();