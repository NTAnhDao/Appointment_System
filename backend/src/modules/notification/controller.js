import * as service from "./sendMail.js";
import { getInvoiceDetail } from "../invoice/service.js";
import { generatePDF } from "./generatePdf.js";

export const sendMail = async (req, res) => {
    try {
        const { type, data, patientMail, attachPdf } = req.body;
        await service.sendMail({ type, data, patientMail, attachPdf });
        return res.status(200).json({ success: true, message: "Gửi mail thành công" });
    } catch (error) {
        console.error("Send Mail Error:", error.message);
        return res.status(500).json({ success: false, message: "Lỗi khi gửi mail: " + error.message });
    }
}

export const downloadInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await getInvoiceDetail(id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const pdfBuffer = await generatePDF(invoice);

    // 🔥 set header để browser hiểu là file PDF
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${id}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF ERROR:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};