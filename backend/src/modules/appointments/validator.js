import { execute } from "../../config/db.oracle.js";

// 🔥 validate create appointment
export const validateCreateAppointment = async (req, res, next) => {
  try {
    const { schedule_id, patient_id } = req.body;
    const userId = req.user.id;

    // ❌ thiếu field
    if (!schedule_id || !patient_id) {
      return res.status(400).json({
        message: "schedule_id and patient_id are required"
      });
    }

    // 🔥 check patient tồn tại + thuộc user
    const patient = await execute(
      `SELECT * FROM app.patient
       WHERE id = :id AND user_id = :userId`,
      { id: patient_id, userId }
    );

    if (!patient.rows.length) {
      return res.status(403).json({
        message: "Patient not found or not owned"
      });
    }

    // 🔥 check schedule tồn tại
    const schedule = await execute(
      `SELECT *
       FROM app.schedule
       WHERE schedule_id = :id`,
      { id: schedule_id }
    );

    if (!schedule.rows.length) {
      return res.status(404).json({
        message: "Schedule not found"
      });
    }

    const s = schedule.rows[0];

    // 🔥 check lịch quá khứ
    const now = new Date();

    if (new Date(s.WORK_DATE) < now) {
      return res.status(400).json({
        message: "Cannot book past schedule"
      });
    }

    // 🔥 check status
    if (s.STATUS && s.STATUS !== "AVAILABLE") {
      return res.status(400).json({
        message: "Schedule not available"
      });
    }

    next();
  } catch (err) {
    console.error("VALIDATE ERROR:", err);
    return res.status(500).json({
      message: err.message || "Validation error"
    });
  }
};