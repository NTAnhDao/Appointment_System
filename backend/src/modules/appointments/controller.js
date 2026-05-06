import * as service from "./service.js";
import { mapAppointmentDTO } from "./dto.js";

export const create = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = mapAppointmentDTO(req.body);

    const result = await service.createAppointment(data, userId);

    res.json({
      success: true,
      appointmentId: result.appointmentId,
      invoiceId: result.invoiceId
    });
  } catch (err) {
     if (err.errorNum === 20001) {

      if (err.message.includes("Schedule is full")) {
        return res.status(400).json({
          success: false,
          message: "Khung giờ khám đã đủ số lượng bệnh nhân"
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra"
    });
  }
};

export const confirm = async (req, res) => {
  try {
    await service.confirmAppointment(req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const cancel = async (req, res) => {
  try {
    await service.cancelAppointment(req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getMy = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await service.getMyAppointments(userId);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

