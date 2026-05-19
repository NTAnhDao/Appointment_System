import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from "../components/layout/MainLayout";
import { getInvoiceDetailAPI } from '../services/InvoiceService';
import { updateStatusInvoiceAPI } from '../services/InvoiceService';
import PaymentRetry from "../components/ui/PaymentRetry"
import { sendNotificationsAPI } from '../services/NotificationService';
import { useBooking } from "../context/BookingContext";
import '../styles/payments.css';

export default function PaymentSuccessPage() {
  const nav = useNavigate();
  const isConfirmed = useRef(false);
  const [searchParams] = useSearchParams();
  const [invoiceDetail, setInvoiceDetail] = useState(null);
  const isVnpay = searchParams.get('vnp_ResponseCode') !== null;
  const isMomo = searchParams.get('resultCode') !== null;
  const isQR = searchParams.get('method') === 'qr';
  const isCash = searchParams.get('method') === 'cash';
  const { resetBookingData } = useBooking();



  const [payment, setPayment] = useState({
    success: false,
    amount: 0,
    orderInfo: '',
    txnRef: '',
    bankCode: '',
    payDate: '',
    message: 'Đang xử lý...'
  });

  useEffect(() => {


    let data = {
      success: false,
      amount: 0,
      orderInfo: '',
      txnRef: '',
      bankCode: '',
      payDate: '',
      message: 'Đang xử lý...'
    };
    let targetAppId = searchParams.get('invoiceId');


    // ===== VNPAY =====
    if (isVnpay) {
      const responseCode = searchParams.get('vnp_ResponseCode');
      const transactionStatus = searchParams.get('vnp_TransactionStatus');
      const orderId = searchParams.get('vnp_TxnRef');

      const amount = searchParams.get('vnp_Amount')
        ? Math.floor(parseInt(searchParams.get('vnp_Amount')) / 100)
        : 0;

      const success = responseCode === '00' && transactionStatus === '00';

      fetch("http://localhost:5000/api/payments/vnpay/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          vnp_TxnRef: orderId,
          vnp_ResponseCode: responseCode
        })
      })
        .then(res => res.json())
        .then(res => console.log("VNPAY UPDATE:", res))
        .catch(err => console.error(err));

      data = {
        success,
        amount,
        orderInfo: decodeURIComponent(searchParams.get('vnp_OrderInfo') || ''),
        txnRef: orderId || '',
        bankCode: 'VNPAY',
        payDate: searchParams.get('vnp_PayDate') || '',
        message: success ? 'Thanh toán thành công!' : 'Thanh toán thất bại!'

      };
    }

    // ===== MOMO =====
    if (isMomo) {
      const resultCode = searchParams.get('resultCode');
      const orderId = searchParams.get('orderId');

      const success = resultCode === '0';

      fetch("http://localhost:5000/api/payments/momo/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId,
          resultCode: Number(resultCode)
        })
      })
        .then(res => res.json())
        .then(res => console.log("MOMO UPDATE:", res))
        .catch(err => console.error(err));

      data = {
        success,
        amount: parseInt(searchParams.get('amount') || 0),
        orderInfo: decodeURIComponent(searchParams.get('orderInfo') || ''),
        txnRef: orderId || '',
        bankCode: 'MOMO',
        payDate: searchParams.get('responseTime') || '',
        message: success ? 'Thanh toán thành công!' : 'Thanh toán thất bại!'

      };
    }
    // ===== QR CODE =====
    if (isQR) {
      const orderId = searchParams.get('orderId');
      const amountStr = searchParams.get('amount');
      const statusStr = searchParams.get('status');
      const isLaptop = searchParams.get('isLaptop') === 'true'; // Kiểm tra xem ai đang mở trang này
      const success = statusStr === 'success' || isLaptop;

      data = {
        success,
        amount: parseInt(amountStr || 0),
        orderInfo: 'Thanh toán quét mã QR',
        txnRef: orderId || '',
        bankCode: 'QR_BANK',
        payDate: new Date().getTime(),
        message: success ? 'Thanh toán thành công!' : 'Thanh toán thất bại!'
      };
    }

    // ===== CASH =====

    if (isCash) {
      const orderId = searchParams.get('orderId');
      const amountStr = searchParams.get('amount');
      const statusStr = searchParams.get('status');
      const success = statusStr === 'success';

      data = {
        success,
        amount: parseInt(amountStr || 0),
        orderInfo: 'Thanh toán tại quầy',
        txnRef: orderId || '',
        bankCode: 'TẠI VIỆN',
        payDate: new Date().getTime(),
        message: success ? 'Đặt lịch thành công!' : 'Đặt lịch thất bại!'
      };
    }

    setPayment(data);
    const currentTxnRef = data.txnRef;

    const runUpdate = async () => {

      if (currentTxnRef && !isConfirmed.current) {

        isConfirmed.current = true;
        let targetAppId = searchParams.get('invoiceId');

        if (!targetAppId && currentTxnRef.toString().startsWith("ORDER_")) {
          const parts = currentTxnRef.split("_");
          targetAppId = parts[1];
        } else if (!targetAppId) {
          targetAppId = currentTxnRef;
        }

        if (targetAppId) {
          if (!isCash) {
            await updateStatusInvoiceAPI(targetAppId, data.success ? 'PAID' : 'CANCELLED');
          }

          fetchInvoice(targetAppId);

        }
      }
    }
    runUpdate();
  }, [searchParams]);

  const fetchInvoice = async (id) => {
    const res = await getInvoiceDetailAPI(id);
    setInvoiceDetail(res.data);

    // nếu online mà chưa có queue → gọi lại
    if ((isVnpay || isMomo || isQR) && !res.data.queueNumber) {
      setTimeout(() => fetchInvoice(id), 2000);
    }
  };

  useEffect(() => {
    if (!invoiceDetail || !payment.txnRef) return;


    // ❌ tránh gọi nhiều lần
    if (!isConfirmed.current) return;

    const isOnline = isVnpay || isMomo || isQR;

    // ===== CASE 1: THANH TOÁN ONLINE =====
    if (isOnline && payment.success) {
      if (!invoiceDetail.queueNumber) return;

      sendNotificationsAPI({
        type: "PAYMENT_SUCCESS",
        attachPdf: true,
        patientMail: invoiceDetail?.email,
        data: invoiceDetail
      });
    }

    // ===== CASE 2: THANH TOÁN TẠI QUẦY =====
    if (isCash && payment.success) {
      sendNotificationsAPI({
        type: "BOOKING_CREATED",
        attachPdf: false,
        patientMail: invoiceDetail?.email,
        data: invoiceDetail
      });
    }

    console.log("EMAIL FE:", invoiceDetail?.email);

  }, [invoiceDetail]);

  const { success, amount, orderInfo, txnRef, bankCode, payDate, message } = payment;

  // ===== FORMAT DATE =====
  const formatPayDate = (payDate) => {
    if (!payDate) return '';

    const str = String(payDate).trim();
    let date = null;

    // yyyyMMddHHmmss (VNPAY / MOMO)
    if (/^\d{14}$/.test(str)) {
      const year = str.slice(0, 4);
      const month = str.slice(4, 6);
      const day = str.slice(6, 8);
      const hour = str.slice(8, 10);
      const minute = str.slice(10, 12);

      return `${day}/${month}/${year} ${hour}:${minute}`;
    }

    if (!isNaN(str)) {
      date = new Date(Number(str));
    } else {
      date = new Date(str);
    }

    if (!date || isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hour}:${minute}`;
  };

  const formatDateOnly = (dateInput) => {
  if (!dateInput) return '';

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

  return (
    <MainLayout>
      <main className="payment-container">

        {/* ===== HEADER (FULL WIDTH) ===== */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "28px",
              background: success ? "#10b981" : "#ef4444",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <span className="material-symbols-outlined">
              {success ? "check_circle" : "cancel"}
            </span>
          </div>

          <h1
            style={{
              fontSize: "36px",
              fontWeight: "800",
              color: success ? "#0a315e" : "#dc2626"
            }}
          >
            {message}
          </h1>


          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
              lineHeight: 1.6,
              maxWidth: "600px"
            }}
          >
            {success ? (
              <>
                Thông tin chi tiết lịch hẹn của bạn đã được gửi qua email.
                <br />
                Vui lòng lưu lại đến khám đúng giờ nhé!.
              </>
            ) : (
              <>
                Rất tiếc, giao dịch không thành công.
                <br />
                Bạn có thể thanh toán bằng phương thức khác trong khoảng 15 phút.
              </>
            )}
          </p>
        </div>

        {/* ===== GRID 2 CỘT ===== */}
        {success && (
          <div className="payment-grid">

            {/* ===== LEFT ===== */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* CHI TIẾT */}
              <div className="card">
                <h4>
                  Chi tiết lịch hẹn
                </h4>
                <div className="info-grid">
                  <div>
                    <span className="info-label">STT:</span>
                    <span className="info-value">
                      {isCash
                        ? "Chưa có số thứ tự"
                        : (invoiceDetail?.queueNumber || "Đang xử lý...")}</span>
                  </div>

                  <div>
                    <span className="info-label">Họ tên:</span>
                    <span className="info-value">{invoiceDetail?.patientName}</span>
                  </div>

                  <div>
                    <span className="info-label">CCCD:</span>
                    <span className="info-value">{invoiceDetail?.identityNumber}</span>
                  </div>

                  <div>
                    <span className="info-label">BHYT:</span>
                    <span className="info-value">
                      {invoiceDetail?.bhyt || "Không"}
                    </span>
                  </div>

                  <div>
                    <span className="info-label">SĐT:</span>
                    <span className="info-value">{invoiceDetail?.phone}</span>
                  </div>

                  <div>
                    <span className="info-label">Giới tính:</span>
                    <span className="info-value">{invoiceDetail?.gender}</span>
                  </div>

                  <div>
                    <span className="info-label">Ngày sinh:</span>
                    <span className="info-value">{formatDateOnly(invoiceDetail?.birthday)}</span>
                  </div>

                  <div>
                    <span className="info-label">Chuyên khoa:</span>
                    <span className="info-value">{invoiceDetail?.specialty}</span>
                  </div>

                  <div>
                    <span className="info-label">Bác sĩ:</span>
                    <span className="info-value">{invoiceDetail?.doctor}</span>
                  </div>

                  <div>
                    <span className="info-label">Giá tiền:</span>
                    <span className="info-value">
                      {amount.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>

                  <div>
                    <span className="info-label">Thời gian:</span>
                    <span className="info-value">{invoiceDetail?.displayTime}</span>
                  </div>

                  <div>
                    <span className="info-label">Địa chỉ:</span>
                    <span className="info-value">{invoiceDetail?.address}</span>
                  </div>
                </div>
              </div>

              {/* HƯỚNG DẪN */}
              <div className="card">
                <h4>Hướng dẫn quan trọng</h4>

                {[
                  "Có mặt trước 15 phút tại sảnh A",
                  "Mang theo CMND/CCCD hoặc BHYT",
                  "Quét QR tại máy Check-in"
                ].map((item, i) => (
                  <div className="step" key={i}>
                    <div className="step-number">{i + 1}</div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

            </div>


            {/* ===== RIGHT ===== */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* THANH TOÁN */}
              <div className="card">
                <h4>Thông tin thanh toán</h4>

                <div className="payment-row">
                  <span className="payment-label">Mã giao dịch:</span>
                  <span className="payment-value">{txnRef ? txnRef.split('_').pop() : ""}</span>
                </div>

                <div className="payment-row">
                  <span className="payment-label">Số tiền:</span>
                  <span className="payment-value">
                    {amount.toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>

                <div className="payment-row">
                  <span className="payment-label">Nội dung:</span>
                  <span className="payment-value">{orderInfo}</span>
                </div>

                <div className="payment-row">
                  <span className="payment-label">Ngân hàng:</span>
                  <span className="payment-value">{bankCode}</span>
                </div>

                <div className="payment-row">
                  <span className="payment-label">Thời gian:</span>
                  <span className="payment-value">{formatPayDate(payDate)}</span>
                </div>

                <div className="payment-row">
                  <span className="payment-label">Trạng thái thanh toán:</span>
                  <span className="payment-value">{isCash
                    ? "Chờ thanh toán (Tại quầy)"
                    : (success ? "Thành công" : "Thất bại")
                  }</span>
                </div>
              </div>

              {/* BUTTON */}
              <div className="card">
                <button className="btn btn-primary"
                   onClick={() => {
                    resetBookingData();
                    nav("/booking");
                  }}>
                  Đặt lịch mới
                </button>

                <button className="btn btn-outline" style={{ marginTop: "10px" }}
                  onClick={() => nav("/")}>
                  Về trang chủ
                </button>
              </div>

            </div>
          </div>
        )}

        {!success && (
          <PaymentRetry
            onRetry={() => nav("/appointments?filter=pending")}
            onHome={() => nav("/")}
          />
        )}

      </main>
    </MainLayout>
  );
}