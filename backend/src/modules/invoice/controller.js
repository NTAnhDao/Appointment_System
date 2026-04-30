import * as service from "./service.js";
import { withTransaction } from "../../config/db.oracle.js";

export const create = async (req, res) => {
  try {
    let newInvoiceId;
    await withTransaction(async (conn) => {
      newInvoiceId = await service.createInvoiceForAppointment(conn, req.body);
    });
    return res.status(201).json({ success: true, message: "Tạo hóa đơn thành công", data: { invoice_id: newInvoiceId } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi khi tạo hóa đơn." });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await withTransaction(async (conn) => {
      if (status === "PAID") await service.markPaid(conn, id);
      else if (status === "CANCELLED") await service.cancelInvoice(conn, id);
      else throw new Error("Trạng thái không hợp lệ");
    });

    return res.status(200).json({ success: true, message: "Cập nhật thành công" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

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