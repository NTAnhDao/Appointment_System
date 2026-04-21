import { execute } from "../../config/db.oracle.js";

class PaymentRepository {

  async createPayment(data) {
    const sql = `
      INSERT INTO app.PAYMENTS
      (APPOINTMENT_ID, AMOUNT, PAYMENT_METHOD, STATUS, ORDER_ID)
      VALUES (:appointment_id, :amount, :payment_method, :status, :order_id)
    `;

    return await execute(sql, data, { autoCommit: true });
  }

  async findByOrderId(order_id) {
    const sql = `
      SELECT * FROM app.PAYMENTS
      WHERE ORDER_ID = :order_id
    `;

    return await execute(sql, { order_id });
  }

  async updateStatus(order_id, status) {
    const sql = `
      UPDATE app.PAYMENTS
      SET STATUS = :status
      WHERE ORDER_ID = :order_id
    `;

    return await execute(
      sql,
      { order_id, status },
      { autoCommit: true }
    );
  }

}

export default new PaymentRepository();