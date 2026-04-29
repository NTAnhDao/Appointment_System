import * as service from "./service.js";
import { mapAppointmentDTO } from "./dto.js";

export const getDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await service.getInvoiceDetail(id);

    res.json({
      success: true,
      data
    });

  } catch (err) {
    console.error("Get Detail Error:", err.message);

    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};