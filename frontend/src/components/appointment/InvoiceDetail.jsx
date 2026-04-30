import React from "react";

export default function InvoiceDetail({ invoice }) {
    if (!invoice) return <div>Loading...</div>;

    const {
        code,
        createdAt,
        status,
        patient,
        address,
        items,
        subtotal,
        discount,
        total,
    } = invoice;

    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            {/* Actions */}
            <div className="hidden md:flex justify-end gap-3 mb-8">
                <button className="flex items-center gap-2 px-5 py-2.5 border rounded-xl">
                    <span className="material-symbols-outlined">download</span>
                    <span className="text-sm font-semibold">Tải PDF</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 border rounded-xl">
                    <span className="material-symbols-outlined">mail</span>
                    <span className="text-sm font-semibold">Gửi Email</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl">
                    <span className="material-symbols-outlined">print</span>
                    <span className="text-sm font-semibold">In hóa đơn</span>
                </button>
            </div>

            {/* Invoice */}
            <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
                {/* Header */}
                <div className="p-8 md:p-12 flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">HÓA ĐƠN DỊCH VỤ Y TẾ</h1>
                        <p>Mã số: {code}</p>
                        <p>Ngày phát hành: {createdAt}</p>
                    </div>

                    {status === "PAID" && (
                        <div className="border-4 rounded-full px-6 py-6 text-green-600 font-bold rotate-[-12deg]">
                            ĐÃ THANH TOÁN
                        </div>
                    )}
                </div>

                {/* Patient */}
                <div className="px-8 md:px-12 py-10 grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-sm font-bold mb-4">Thông tin bệnh nhân</h3>
                        <p className="text-lg font-bold text-blue-600">
                            {patient.name}
                        </p>
                        <p>Mã BN: {patient.code}</p>
                        <p>Giới tính: {patient.gender}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold mb-4">Địa chỉ</h3>
                        <p>{address}</p>
                    </div>
                </div>

                {/* Services */}
                <div className="px-8 md:px-12 pb-12">
                    <table className="w-full">
                        <thead>
                            <tr className="text-sm border-b">
                                <th className="text-left pb-4">Mô tả dịch vụ</th>
                                <th className="text-right pb-4">Thành tiền</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-4">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {item.description}
                                        </p>
                                    </td>

                                    <td className="text-right font-semibold">
                                        {item.price.toLocaleString()}đ
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Summary */}
                    <div className="mt-8 flex justify-end">
                        <div className="w-full md:w-72 bg-gray-50 rounded-xl p-6 space-y-3">
                            <div className="flex justify-between">
                                <span>Tạm tính</span>
                                <span>{subtotal.toLocaleString()}đ</span>
                            </div>

                            <div className="flex justify-between text-green-600">
                                <span>Giảm giá</span>
                                <span>-{discount.toLocaleString()}đ</span>
                            </div>

                            <div className="flex justify-between font-bold text-lg border-t pt-3">
                                <span>Tổng cộng</span>
                                <span className="text-blue-600">
                                    {total.toLocaleString()}đ
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 grid grid-cols-2 text-center border-t pt-10">
                        <div>
                            <p className="text-xs">Người lập phiếu</p>
                            <p className="italic text-gray-500">System Generated</p>
                        </div>

                        <div>
                            <p className="text-xs">Xác nhận thanh toán</p>
                            <span className="material-symbols-outlined text-3xl text-blue-400">
                                verified_user
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}