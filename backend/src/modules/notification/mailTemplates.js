export const generateTemplates = {
  PAYMENT_SUCCESS: (data) => ({
    subject: "Xác nhận thanh toán thành công",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Xin chào <b>${data.patientName}</b>,</p>

        <p>
          Chúng tôi xác nhận bạn đã <b>thanh toán thành công</b> cho lịch khám tại hệ thống.
        </p>

        <p><b>Số tiền:</b> ${data.amount.toLocaleString("vi-VN")}đ</p>

        <p>
          Hóa đơn chi tiết được đính kèm trong email này. Vui lòng kiểm tra để đảm bảo thông tin chính xác.
        </p>

        <p>
          Nếu cần hỗ trợ, vui lòng liên hệ với chúng tôi qua hotline hoặc phản hồi lại email này.
        </p>

        <br/>
        <p>Trân trọng,</p>
        <p><b>Superior Health Clinic</b></p>
      </div>
    `,
    notification: {
      title: "Thanh toán thành công",
      message: `Bạn đã thanh toán ${data.amount.toLocaleString("vi-VN")}đ`
    }
  }),

  BOOKING_CREATED: (data) => ({
    subject: "Xác nhận đặt lịch khám",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Xin chào <b>${data.patientName}</b>,</p>

        <p>
          Bạn đã <b>đặt lịch khám thành công</b> tại hệ thống của chúng tôi.
        </p>

        <p><b>Thời gian:</b> ${data.displayTime}</p>
        <p><b>Bác sĩ:</b> ${data.doctor}</p>

        <p>
          Vui lòng đến trước giờ hẹn khoảng <b>10 - 15 phút</b> để làm thủ tục.
        </p>

        <p>
          Nếu có thay đổi hoặc cần hỗ trợ, bạn có thể liên hệ với chúng tôi bất cứ lúc nào.
        </p>

        <br/>
        <p>Trân trọng,</p>
        <p><b>Superior Health Clinic</b></p>
      </div>
    `,
    notification: {
      title: "Đặt lịch thành công",
      message: `Bạn đã đặt lịch khám vào ${data.displayTime} với bác sĩ ${data.doctor}`
    }
  }),

  REMINDER: (data) => ({
    subject: "Nhắc lịch khám sắp tới",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Xin chào <b>${data.patientName}</b>,</p>

        <p>
          Đây là email <b>nhắc lịch khám</b> của bạn sắp diễn ra:
        </p>

        <p><b>Thời gian:</b> ${data.displayTime}</p>
        <p><b>Bác sĩ:</b> ${data.doctor}</p>

        <p>
          Vui lòng đến đúng giờ để đảm bảo quá trình khám diễn ra thuận lợi.
        </p>

        <p>
          Nếu bạn không thể tham gia, vui lòng hủy hoặc đổi lịch trước để tránh ảnh hưởng đến lịch khám.
        </p>

        <br/>
        <p>Trân trọng,</p>
        <p><b>Superior Health Clinic</b></p>
      </div>
    `,
    notification: {
      title: "Nhắc lịch khám",
      message: `Bạn có lịch khám vào ${data.displayTime} với bác sĩ ${data.doctor}`
    }
  })
};