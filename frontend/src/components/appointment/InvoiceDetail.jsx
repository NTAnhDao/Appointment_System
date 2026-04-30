import React from "react";

export default function InvoiceDetail({ invoice }) {
  if (!invoice) return <div>Loading...</div>;

  const {
    invoiceId,
    appointmentId,
    patientName,
    gender,
    birthday,
    specialty,
    doctor,
    amount,
    invoiceStatus,
    appointmentStatus,
    displayTime,
    address,
    identityNumber,
    bhyt,
    phone
  } = invoice;

  const formatCurrency = (num) =>
    num?.toLocaleString("vi-VN") + "đ";

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("vi-VN") : "";

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Header actions */}
      <div className="hidden md:flex justify-end gap-3 mb-8">
        <button className="px-5 py-2.5 border rounded-xl">
          Tải PDF
        </button>
        <button className="px-5 py-2.5 border rounded-xl">
          Gửi Email
        </button>
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl">
          In hóa đơn
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
        
        {/* Header */}
        <div className="p-8 md:p-12 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">
              HÓA ĐƠN KHÁM BỆNH
            </h1>
            <p>Mã hóa đơn: #{invoiceId}</p>
            <p>Mã lịch hẹn: #{appointmentId}</p>
            <p>Thời gian khám: {displayTime}</p>
          </div>

          {invoiceStatus === "paid" && (
            <div className="border-4 rounded-full px-6 py-6 text-green-600 font-bold rotate-[-12deg]">
              ĐÃ THANH TOÁN
            </div>
          )}

          {invoiceStatus === "unpaid" && (
            <div className="border-4 rounded-full px-6 py-6 text-orange-500 font-bold rotate-[-12deg]">
              CHƯA THANH TOÁN
            </div>
          )}
        </div>

        {/* Patient info */}
        <div className="px-8 md:px-12 py-10 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-bold mb-4">
              Thông tin bệnh nhân
            </h3>
            <p className="text-lg font-bold text-blue-600">
              {patientName}
            </p>
            <p>Giới tính: {gender}</p>
            <p>Ngày sinh: {formatDate(birthday)}</p>
            <p>CCCD: {identityNumber}</p>
            <p>BHYT: {bhyt || "Không có"}</p>
            <p>Điện thoại: {phone}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">
              Địa chỉ
            </h3>
            <p>{address}</p>
          </div>
        </div>

        {/* Service */}
        <div className="px-8 md:px-12 pb-12">
          <table className="w-full">
            <thead>
              <tr className="text-sm border-b">
                <th className="text-left pb-4">Dịch vụ</th>
                <th className="text-right pb-4">Chi phí</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-4">
                  <p className="font-semibold">
                    Khám {specialty}
                  </p>
                  <p className="text-sm text-gray-500">
                    Bác sĩ: {doctor}
                  </p>
                </td>

                <td className="text-right font-semibold">
                  {formatCurrency(amount)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Total */}
          <div className="mt-8 flex justify-end">
            <div className="w-full md:w-72 bg-gray-50 rounded-xl p-6 space-y-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng</span>
                <span className="text-blue-600">
                  {formatCurrency(amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Appointment status */}
          <div className="mt-6 text-sm text-gray-600">
            Trạng thái lịch hẹn:{" "}
            <span className="font-semibold">
              {appointmentStatus}
            </span>
          </div>

          {/* Footer */}
          <div className="mt-16 grid grid-cols-2 text-center border-t pt-10">
            <div>
              <p className="text-xs">Hệ thống</p>
              <p className="italic text-gray-500">
                Tự động tạo
              </p>
            </div>

            <div>
              <p className="text-xs">Xác nhận</p>
              <span className="text-3xl text-blue-400">
                ✔
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}