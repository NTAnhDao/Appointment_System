import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let pool;

// 🔥 INIT DB (retry)
export async function initialize() {
  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      pool = await oracledb.createPool({
        user: process.env.DB_USER || "system",
        password: process.env.DB_PASSWORD || "123456",
        connectString: process.env.DB_CONNECT_STRING || "oracle:1521/XEPDB1",

        poolMin: 2,
        poolMax: 10,
        poolIncrement: 1,
        poolTimeout: 60,
        queueTimeout: 60000,
      });

      console.log("✅ Oracle pool created");
      return;
    } catch (err) {
      attempt++;
      console.log(`❌ DB chưa sẵn sàng, thử lại lần ${attempt}...`);
      await new Promise((res) => setTimeout(res, 3000));
    }
  }

  throw new Error("❌ Không thể kết nối Oracle");
}

// 🔥 GET CONNECTION (dùng cho transaction)
export function getConnection() {
  if (!pool) throw new Error("DB chưa init");
  return pool.getConnection();
}

// dùng cho query đơn lẻ
export async function execute(sql, binds = {}, opts = {}) {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(sql, binds, {
      autoCommit: false, // ❗ không commit tự động
      ...opts,
    });

    // nếu muốn auto commit thì cho phép override
    if (opts.autoCommit) {
      await connection.commit();
    }

    return result;
  } catch (err) {
    if (connection) await connection.rollback();
    console.error("❌ Query error:", err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("❌ Error closing connection:", err);
      }
    }
  }
}

export async function withTransaction(callback) {
  const connection = await getConnection();

  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    await connection.close();
  }
}