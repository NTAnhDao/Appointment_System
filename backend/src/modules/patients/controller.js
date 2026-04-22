import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from "./service.js";

// 🔥 CREATE
export const create = async (req, res) => {
  try {
    const userId = req.user.id;

    const id = await createPatient(req.body, userId);

    return res.status(201).json({
      message: "Created successfully",
      data: { id },
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

// 🔥 GET ALL
export const getAll = async (req, res) => {
  try {
    const userId = req.user.id;

    const patients = await getPatients(userId);

    return res.json({
      data: patients,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// 🔥 GET BY ID
export const getById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const patient = await getPatientById(id, userId);

    return res.json({
      data: patient,
    });
  } catch (err) {
    return res.status(404).json({
      error: err.message,
    });
  }
};

// 🔥 UPDATE
export const update = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await updatePatient(id, req.body, userId);

    return res.json({
      message: "Updated successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

// 🔥 DELETE
export const remove = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await deletePatient(id, userId);

    return res.json({
      message: "Deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};