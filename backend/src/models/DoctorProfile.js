import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    from: { type: Number, required: true },
    to: { type: mongoose.Schema.Types.Mixed, required: true }, // có thể là number hoặc "nay"
    position: { type: String, required: true },
    hospital: { type: String, required: true }
  },
  { _id: false }
);

const EducationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    school: { type: String, required: true }
  },
  { _id: false }
);

const AchievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number }
  },
  { _id: false }
);

const DoctorProfileSchema = new mongoose.Schema(
  {
    doctorId: {
      type: Number,
      required: true,
      unique: true, // mỗi doctor chỉ có 1 profile
      index: true
    },

    bio: {
      type: String
    },

    languages: [
      {
        type: String
      }
    ],

    experience: [ExperienceSchema],

    education: [EducationSchema],

    achievements: [AchievementSchema]
  },
  {
    timestamps: true // tự tạo createdAt, updatedAt
  }
);

export default mongoose.model("DoctorProfile", DoctorProfileSchema);