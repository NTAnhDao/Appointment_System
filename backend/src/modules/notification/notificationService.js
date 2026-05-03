import Notification from "../../models/Notification.js";

export const createNotification = async ({ patientId, userId, type, title, message, data ={} }) => {
  return await Notification.create({
    patientId,
    userId,
    type,
    title,
    message,
    data
  });
};

export default createNotification;