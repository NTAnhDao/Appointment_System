import * as sqlRepo from "./sql.repository.js";

export async function getDepartments() {
    return await sqlRepo.findAllDepartments();
}