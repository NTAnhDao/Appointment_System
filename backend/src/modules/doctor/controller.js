import * as doctorService from "./service.js";

export async function getDoctors(req, res) {
    try {
        const data = await doctorService.getDoctors();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getDoctorDetail(req, res) {
    try {
        const { id } = req.params;
        const data = await doctorService.getDoctorDetail(id);

        res.json(data);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

