import { execute } from '../../config/db.oracle.js';

export async function findAllDepartments() {
    const result = await execute(`
        SELECT 
            department_id,
            name,
            consultation_fee
        FROM department
        ORDER BY department_id
    `);

    return result.rows.map(row => ({
        DEPARTMENT_ID: row.DEPARTMENT_ID,
        NAME: row.NAME,
        CONSULTATION_FEE: row.CONSULTATION_FEE
    }));
}
