const formatCurrency = (num) =>
  Number(num).toLocaleString("vi-VN") + "đ";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("vi-VN");

export const generateInvoiceHTML = (invoice) => {
  return `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 24px;
          color: #333;
        }

        .container {
          border: 1px solid #eee;
          border-radius: 12px;
          overflow: hidden;
        }

        .header {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          background: #f8f9fa;
        }

        .title {
          font-size: 22px;
          font-weight: bold;
        }

        .status {
          width: 100px;
          height: 100px;
          border: 3px solid #ccc;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-12deg);
          font-weight: bold;
        }

        .paid { color: green; }
        .unpaid { color: orange; }

        .quick-info {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          text-align: center;
        }

        .section {
          padding: 20px;
        }

        .grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .col-6 {
          width: 48%;
        }

        .col-12 {
          width: 100%;
        }

        .label {
          font-size: 12px;
          color: #888;
        }

        .value {
          font-weight: 600;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
        }

        th {
          text-align: left;
          font-size: 12px;
          color: #888;
          padding-bottom: 8px;
        }

        td {
          padding: 8px 0;
        }

        .text-right {
          text-align: right;
        }

        .summary {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }

        .summary-box {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          min-width: 200px;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          text-align: center;
          border-top: 1px solid #eee;
          margin-top: 30px;
          padding-top: 20px;
        }

        .small {
          font-size: 12px;
          color: #777;
        }

      </style>
    </head>

    <body>
      <div class="container">

        <!-- HEADER -->
        <div class="header">
          <div>
            <div class="title">HÓA ĐƠN DỊCH VỤ Y TẾ</div>
            <p>Mã hóa đơn: #${invoice.invoiceId}</p>
            <p>Ngày phát hành: ${formatDate(new Date())}</p>
          </div>

          <div class="status ${
            invoice.invoiceStatus === "paid" ? "paid" : "unpaid"
          }">
            ${
              invoice.invoiceStatus === "paid"
                ? "ĐÃ THANH TOÁN"
                : "CHƯA THANH TOÁN"
            }
          </div>
        </div>

        <!-- QUICK INFO -->
        <div class="quick-info">
          <div>
            <div class="label">Số thứ tự</div>
            <div class="value">#${invoice.queueNumber || "--"}</div>
          </div>

          <div>
            <div class="label">Thời gian</div>
            <div class="value">${invoice.time || ""}</div>
          </div>

          <div>
            <div class="label">Ngày khám</div>
            <div class="value">${invoice.date || ""}</div>
          </div>

          <div>
            <div class="label">Địa chỉ</div>
            <div class="value">${invoice.address || ""}</div>
          </div>
        </div>

        <!-- PATIENT -->
        <div class="section">
          <h3>Thông tin bệnh nhân</h3>
          <p style="font-weight:bold; font-size:16px;">
            ${invoice.patientName}
          </p>

          <div class="grid">
            <div class="col-6">
              <div class="label">Giới tính</div>
              <div class="value">${invoice.gender}</div>
            </div>

            <div class="col-6">
              <div class="label">Ngày sinh</div>
              <div class="value">${formatDate(invoice.birthday)}</div>
            </div>

            <div class="col-6">
              <div class="label">CCCD</div>
              <div class="value">${invoice.identityNumber}</div>
            </div>

            <div class="col-6">
              <div class="label">BHYT</div>
              <div class="value">${invoice.bhyt || "Không có"}</div>
            </div>

            <div class="col-6">
              <div class="label">Điện thoại</div>
              <div class="value">${invoice.phone}</div>
            </div>

            <div class="col-6">
              <div class="label">Địa chỉ</div>
              <div class="value">${invoice.address}</div>
            </div>
          </div>
        </div>

        <!-- SERVICES -->
        <div class="section">
          <table>
            <thead>
              <tr>
                <th>Dịch vụ</th>
                <th class="text-right">Chi phí</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <b>Khám ${invoice.specialty}</b><br/>
                  <span class="small">Bác sĩ: ${invoice.doctor}</span>
                </td>
                <td class="text-right">
                  ${formatCurrency(invoice.amount)}
                </td>
              </tr>
            </tbody>
          </table>

          <div class="summary">
            <div class="summary-box">
              <div style="display:flex; justify-content:space-between;">
                <b>Tổng cộng</b>
                <b>${formatCurrency(invoice.amount)}</b>
              </div>
            </div>
          </div>

          <!-- FOOTER -->
          <div class="footer">
            <div>
              <div class="small"><b>NGƯỜI LẬP HÓA ĐƠN</b></div>
              <p><i>System Generated</i></p>
            </div>

            <div>
              <div class="small"><b>XÁC NHẬN</b></div>
              <p>Đã thanh toán</p>
            </div>
          </div>

        </div>
      </div>
    </body>
  </html>
  `;
};