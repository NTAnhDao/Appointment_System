// seedAll.js
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("../../backend/.env"),
});

console.log("ENV CHECK:", process.env.MONGO_URI);
import connectDB from "../../backend/src/config/db.mongo.js";
import seedDoctorProfile from "./seedDoctorProfile.js";

const seedAll = async () => {
  try {
    await connectDB();

    await seedDoctorProfile();

    console.log("✅ DONE ALL");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAll();