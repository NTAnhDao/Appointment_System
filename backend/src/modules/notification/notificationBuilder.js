export const buildNotification = (type, payload) => {
    switch (type) {
        case "PAYMENT_SUCCESS":
            return {
                data: {
                    appointmentId: payload.appointmentId,
                    invoiceId: payload.invoiceId,
                    amount: payload.amount
                }
            };

        case "BOOKING_CREATED":
            return {
                data: {
                    appointmentId: payload.appointmentId,
                    time: payload.time,
                    doctor: payload.doctor
                }
            };

        case "REMINDER":
            return {
                data: {
                    appointmentId: payload.appointmentId,
                    time: payload.time
                }
            };

        default:
            return {
                title: "Thông báo",
                message: "Bạn có thông báo mới",
                data: payload
            };
    }
};

export default buildNotification;