import React from "react";
import '../../styles/invoice.css'
import { downloadPDFAPI } from "../../services/InvoiceService.js";

export default function InvoiceDetail({ invoice }) {
  const formatCurrency = (num) =>
    num?.toLocaleString("vi-VN") + "đ";

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("vi-VN") : "";

  return (
    <div className="mx-auto border-0 rounded-4 overflow-hidden" style={{ width: "800px" }}>
      {/* Actions */}
      <div className=" mx-auto my-4 d-flex justify-content-end">
      <button className="btn btn-booking px-5 py-2.5" onClick={() => {
        if (!invoice?.invoiceId) return;
        downloadPDFAPI(invoice?.invoiceId);
      }}>
        <span className="material-symbols-outlined">download</span>
        <span className="text-sm font-semibold">Tải PDF</span>
      </button>
      </div>
      <div className="shadow-xl border rounded-4 bg-white">

        {/* HEADER */}
        <div className="bg-soft p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between gap-4">

          <div>
            <h2 className="fw-bold mb-3">
              HÓA ĐƠN DỊCH VỤ Y TẾ
            </h2>

            <p className="mb-1">
              <strong>Mã hóa đơn:</strong> #{invoice?.invoiceId}
            </p>

            <p className="mb-0">
              <strong>Ngày phát hành:</strong> {formatDate(new Date())}
            </p>
          </div>

          {/* STATUS */}
          <div className="text-center">
            <div
              className="border border-3 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "120px", height: "120px", transform: "rotate(-12deg)" }}
            >
              <span
                className={`fw-bold ${invoice?.invoiceStatus === "paid"
                  ? "text-success"
                  : "text-warning"
                  }`}
              >
                {invoice?.invoiceStatus === "paid"
                  ? "ĐÃ THANH TOÁN"
                  : "CHƯA THANH TOÁN"}
              </span>
            </div>
          </div>
        </div>

        {/* 🔥 QUICK INFO (RẤT QUAN TRỌNG) */}
        <div className="bg-white border-top border-bottom p-3 d-flex flex-wrap justify-content-between text-center">

          <div className="px-3">
            <div className="text-muted small">Số thứ tự</div>
            <div className="fw-bold fs-4 text-primary-customer">
              #{invoice?.queueNumber || "--"}
            </div>
          </div>

          <div className="px-3">
            <div className="text-muted small">Thời gian</div>
            <div className="fw-semibold">{invoice?.time}</div>
          </div>

          <div className="px-3">
            <div className="text-muted small">Ngày khám</div>
            <div className="fw-semibold">{invoice?.date}</div>
          </div>


          <div className="px-3">
            <div className="text-muted small">Địa chỉ</div>
            <div className="fw-semibold">19 Nguyễn Hữu Thọ, Tân Phong, Q7, TP. HCM</div>
          </div>

        </div>

        {/* PATIENT INFO */}
        {/* PATIENT INFO */}
        <div className="p-4 p-md-5">
          <h6 className="text-uppercase text-muted fw-bold mb-3">
            Thông tin bệnh nhân
          </h6>
          {/* Tên */}
          <p className="fw-bold fs-5 text-primary-customer mb-3">
            {invoice?.patientName}
          </p>

          <div className="row g-3">

            {/* Giới tính */}
            <div className="col-6">
              <p className="text-muted small mb-1">Giới tính</p>
              <p className="fw-semibold">{invoice?.gender}</p>
            </div>

            {/* Ngày sinh */}
            <div className="col-6">
              <p className="text-muted small mb-1">Ngày sinh</p>
              <p className="fw-semibold">
                {formatDate(invoice?.birthday)}
              </p>
            </div>

            {/* CCCD */}
            <div className="col-6">
              <p className="text-muted small mb-1">CCCD</p>
              <p className="fw-semibold">{invoice?.identityNumber}</p>
            </div>

            {/* BHYT */}
            <div className="col-6">
              <p className="text-muted small mb-1">BHYT</p>
              <p className="fw-semibold">
                {invoice?.bhyt || "Không có"}
              </p>
            </div>

            {/* Điện thoại */}
            <div className="col-6">
              <p className="text-muted small mb-1">Điện thoại</p>
              <p className="fw-semibold">{invoice?.phone}</p>
            </div>

            {/* Địa chỉ (full width) */}
            <div className="col-6">
              <p className="text-muted small mb-1">Địa chỉ</p>
              <p className="fw-semibold">{invoice?.address}</p>
            </div>

          </div>
        </div>

        {/* SERVICES */}
        <div className="px-4 px-md-5 pb-5">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr className="text-muted text-uppercase small">
                  <th>Dịch vụ</th>
                  <th className="text-end">Chi phí</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <div className="fw-bold">
                      Khám {invoice?.specialty}
                    </div>
                    <div className="text-muted small">
                      Bác sĩ: {invoice?.doctor}
                    </div>
                  </td>

                  <td className="text-end fw-semibold">
                    {formatCurrency(invoice?.amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SUMMARY */}
          <div className="d-flex justify-content-end mt-4">
            <div className="bg-light p-4 rounded-3" style={{ minWidth: "260px" }}>
              <div className="d-flex justify-content-between  align-items-center fw-bold fs-5">
                <span>Tổng cộng</span>
                <span className="text-primary-customer fs-4">
                  {formatCurrency(invoice?.amount)}
                </span>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="row text-center border-top mt-5 pt-4">
            {/* LEFT */}
            <div className="col d-flex flex-column align-items-center">
              <p className="text-muted small mb-2 fw-semibold"> NGƯỜI LẬP HÓA ĐƠN </p>
              <p className="fst-italic text-primary-customer mb-2 mt-4"> System Generated </p>
              <p className="text-muted" style={{ fontSize: "12px" }}> Ký điện tử bởi Superior Health Clinic </p>
            </div> {/* RIGHT */}
            <div className="col d-flex flex-column align-items-center">
              <p className="text-muted small mb-2 fw-semibold"> XÁC NHẬN THANH TOÁN </p>
              <div className="d-flex justify-content-center mb-2 mt-4">
                <span className="material-symbols-outlined fs-2 text-primary"> verified_user </span>
              </div> <p className="text-muted" style={{ fontSize: "12px" }}> Đã đối soát qua cổng thanh toán </p>
            </div>
          </div> </div>

        {/* BOTTOM BAR */}
        <div
          style={{
            height: "6px",
            background: "linear-gradient(90deg, var(--opacity-1), var(--blue-500))",
          }}
        />
      </div >
    </div>

  );
}