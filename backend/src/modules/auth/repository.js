import { execute } from '../../config/db.oracle.js';
import oracledb from 'oracledb';

class AuthRepository {
    async findUserByPhone(phone) {
        const sql = `SELECT * FROM USERS WHERE PHONE = :phone`;
        const result = await execute(sql, { phone });
        return result.rows[0];
    }

    async createUser(userData) {
        const sql = `
            INSERT INTO USERS (FULL_NAME, PHONE, EMAIL, PASSWORD_HASH) 
            VALUES (:fullName, :phone, :email, :passwordHash) 
            RETURNING ID INTO :id
        `;
        
        const binds = {
            fullName: userData.fullName,
            phone: userData.phone,
            email: userData.email,
            passwordHash: userData.passwordHash,
            id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        };

        const result = await execute(sql, binds);
        return result.outBinds.id[0];
    }
}

export default new AuthRepository();