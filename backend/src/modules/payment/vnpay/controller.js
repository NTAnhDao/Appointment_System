// src/modules/payment/controller.js
import crypto from 'node:crypto';           
import qs from 'qs';
import vnpayConfig from '../../../config/vnpay.js';  
import PaymentService from "../service.js";

// Hàm sort object theo chuẩn VNPAY
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();

    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

const createPaymentUrl = async (req, res) => {
    try {
        const { amount, bankCode = '', invoice_id} = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({
                code: '01',
                message: 'Số tiền thanh toán không hợp lệ'
            });
        }
        // tạo payment
        const { order_id } = await PaymentService.createPayment({
            invoice_id,
            amount,
            payment_method: "VNPAY"
        });

        const orderId = order_id;

        const { tmnCode, hashSecret, returnUrl, vnpUrl } = vnpayConfig;

        // Tạo ngày giờ và orderId
        const date = new Date();
        const createDate = 
            date.getFullYear() +
            ('0' + (date.getMonth() + 1)).slice(-2) +
            ('0' + date.getDate()).slice(-2) +
            ('0' + date.getHours()).slice(-2) +
            ('0' + date.getMinutes()).slice(-2) +
            ('0' + date.getSeconds()).slice(-2);

        let vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: tmnCode,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toán lịch khám bệnh`,
            vnp_OrderType: 'other',
            vnp_Amount: Math.round(amount * 100),
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: req.headers['x-forwarded-for'] ||
                        req.connection.remoteAddress ||
                        req.socket.remoteAddress || '127.0.0.1',
            vnp_CreateDate: createDate,
        };

        if (bankCode) {
            vnp_Params.vnp_BankCode = bankCode;
        }

        // Sort và tạo chữ ký
        vnp_Params = sortObject(vnp_Params);

        const signData = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', hashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        vnp_Params.vnp_SecureHash = signed;

        const paymentUrl = vnpUrl + '?' + qs.stringify(vnp_Params, { encode: false });

        res.status(200).json({
            code: '00',
            message: 'Tạo link thanh toán thành công',
            paymentUrl: paymentUrl,
            orderId: orderId
        });

    } catch (error) {
        console.error('Lỗi tạo link VNPAY:', error);
        res.status(500).json({
            code: '99',
            message: 'Có lỗi xảy ra khi tạo link thanh toán'
        });
    }
};

export default createPaymentUrl;   