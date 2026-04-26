import * as departmentService from "./service.js";

export async function getDepartments(req, res) {
    try {
        const data = await departmentService.getDepartments();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}