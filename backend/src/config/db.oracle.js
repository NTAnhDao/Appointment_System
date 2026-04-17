import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let pool;

// 🔥 INIT DB (có retry)
export async function initialize() {
  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      pool = await oracledb.createPool({
        user: process.env.DB_USER || "system",
        password: process.env.DB_PASSWORD || "123456",
        connectString:
          process.env.DB_CONNECT_STRING || "oracle:1521/XEPDB1",
      });

      console.log("✅ Oracle pool created");
      return;
    } catch (err) {
      attempt++;
      console.log(`❌ DB chưa sẵn sàng, thử lại lần ${attempt}...`);

      await new Promise((res) => setTimeout(res, 3000)); // đợi 3s
    }
  }

  throw new Error("❌ Không thể kết nối Oracle");
}

// 🔥 EXECUTE QUERY (an toàn)
export async function execute(sql, binds = {}, opts = {}) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(sql, binds, {
      autoCommit: true,
      ...opts,
    });

    return result;
  } catch (err) {
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