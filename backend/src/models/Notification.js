import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    patientId: Number, 
    userId: Number,

    type: String,

    title: String,
    message: String,

    data: Object,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Notification", NotificationSchema);