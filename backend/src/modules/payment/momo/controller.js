// Thay đổi đường dẫn '../config/momo.js' cho khớp với cấu trúc thư mục thực tế của bạn nhé
import MOMO_CONFIG from '../../../config/momo.js'; 
import axios from 'axios';
import crypto from 'node:crypto';    
import PaymentService from "../service.js";

const createMomoPayment = async (req, res) => {
  try {
    const { amount = 10000, invoice_id } = req.body;
    
    const { order_id } = await PaymentService.createPayment({
      invoice_id,
      amount,
      payment_method: "MOMO"
    });

    const orderId = order_id;
    const requestId = orderId;
    const orderInfo = "Thanh toán lịch khám bệnh";
    const extraData = "";

    const rawHash =
      `accessKey=${MOMO_CONFIG.accessKey}` +
      `&amount=${amount}` +
      `&extraData=${extraData}` +
      `&ipnUrl=${MOMO_CONFIG.ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${MOMO_CONFIG.partnerCode}` +
      `&redirectUrl=${MOMO_CONFIG.redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=payWithATM`;

    const signature = crypto
      .createHmac("sha256", MOMO_CONFIG.secretKey)
      .update(rawHash)
      .digest("hex");

    const momoPayload = {
      partnerCode: MOMO_CONFIG.partnerCode,
      partnerName: "Test",
      storeId: "MomoTest",
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl: MOMO_CONFIG.redirectUrl,
      ipnUrl: MOMO_CONFIG.ipnUrl,
      lang: "vi",
      extraData,
      requestType: "payWithATM",
      signature,
    };

    const response = await axios.post(MOMO_CONFIG.endpoint, momoPayload);

    const momoData = response.data;

    if (momoData.payUrl) {
      return res.json({
        success: true,
        payUrl: momoData.payUrl,
      });
    }

    return res.status(400).json({
      success: false,
      data: momoData,
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Lỗi MoMo",
    });
  }
};

export default createMomoPayment;