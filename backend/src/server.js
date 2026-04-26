import app from "./app.js";
import { initialize } from "./config/db.oracle.js";
import connectDB from "./config/db.mongo.js";



const PORT = process.env.PORT || 5000;

(async () => {
  await initialize();
  connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();