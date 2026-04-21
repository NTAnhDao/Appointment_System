const vnpayConfig = {
    tmnCode: process.env.VNP_TMN_CODE || "6T57NF6I",
    hashSecret: process.env.VNP_HASH_SECRET || "WNTPG3UR2J041I477AC5WT2M8YI77QSU",
    returnUrl: process.env.VNP_RETURN_URL || "http://localhost:5173/success",
    vnpUrl: process.env.VNP_API_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
};

export default vnpayConfig;


// https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html