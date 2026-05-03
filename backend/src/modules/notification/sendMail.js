import nodemailer from "nodemailer";
import { generateTemplates } from "./mailTemplates.js";
import { generatePDF } from "./generatePdf.js"; // optional
import { createNotification } from "./notificationService.js";
import { buildNotification } from "./notificationBuilder.js";


// transporter dùng chung
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "itnotformehihi@gmail.com",
    pass: "hwcrpxkjpsgvnhlc"
  }
});

/**
 * ✅ Generic mail sender
 * @param {Object} options
 * @param {String} options.type - loại mail
 * @param {Object} options.data - data cho template
 * @param {String} options.patientMail - email của bệnh nhân
 * @param {Boolean} options.attachPdf - có attach PDF hay không
 */
export const sendMail = async ({ type, data, patientMail, attachPdf = false }) => {
  try {
    
    if (!patientMail) throw new Error("Không tìm thấy email patient");

    // 2. lấy template
    const content  = generateTemplates[type](data);
    if (!content ) throw new Error("Mail type không hợp lệ");

    const { subject, html, notification } = content;

    // 3. tạo mail options
    let mailOptions = {
      from: '"Superior Health Clinic" <itnotformehihi@gmail.com>',
      to: patientMail,
      subject,
      html
    };

    // 4. attach PDF nếu cần
    if (attachPdf) {
      const pdfBuffer = await generatePDF(data);

      mailOptions.attachments = [
        {
          filename: `invoice-${data.invoiceId}.pdf`,
          content: pdfBuffer
        }
      ];
    }

    // 5. gửi mail
    await transporter.sendMail(mailOptions);
    const notiContent = buildNotification(type, data);

    // lưu notification (Mongo)
    await createNotification({
      patientId: data.patientId,
      userId: data.userId, 
      type,
      title: notification.title,
      message: notification.message,
      data: notiContent.data
    });

    console.log(`✅ Sent mail: ${type} -> ${patientMail}`);

  } catch (err) {
    console.error("❌ Send mail error:", err.message);
    throw err;
  }
};

export default sendMail;