import * as repo from "./repository.js";
import redis from "../../config/redis.js";
import { withTransaction } from "../../config/db.oracle.js";
import { mapPatientDTO } from "./dto.js";

const TTL = 300;

const getAge = (dob) =>
  new Date().getFullYear() - new Date(dob).getFullYear();


// GET ALL (theo user)
export const getPatients = async (userId) => {
  return await repo.getPatientsByUser(userId);
};


// GET BY ID + CACHE + ownership
export const getPatientById = async (id, userId) => {
  const key = `patient:${userId}:${id}`;

  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const data = await repo.findPatientById(id, userId);

  if (!data) throw new Error("Patient not found");

  await redis.set(key, JSON.stringify(data), "EX", TTL);

  return data;
};


// CREATE (transaction + DTO + userId)
export const createPatient = async (rawData, userId) => {
  const data = mapPatientDTO(rawData);

  return await withTransaction(async (conn) => {
    let guardianId = null;

    const age = getAge(data.dob);

    if (age < 18) {
      if (!data.guardian) {
        throw new Error("Guardian required");
      }
      const guardian = await repo.findGuardianByCCCD(
        data.guardian.identity_number
      );

      if (guardian) {
        guardianId = guardian.ID;
      } else {
        guardianId = await repo.createGuardian(data.guardian);
      }
    }

    const id = await repo.insertPatient(conn, {
      ...data,
      guardian_id: guardianId,
      user_id: userId,
    });

    return id;
  });
};


// UPDATE (check ownership + invalidate cache)
export const updatePatient = async (id, rawData, userId) => {
  const patient = await repo.findPatientById(id, userId);

  if (!patient) throw new Error("Forbidden");

  const data = mapPatientDTO(rawData);

  let guardianId = null;
  const age = getAge(data.dob);

  // xử lý guardian giống create
  if (age < 18) {
    if (!data.guardian) {
      throw new Error("Guardian required");
    }

    const guardian = await repo.findGuardianByCCCD(
      data.guardian.identity_number
    );

    if (guardian) {
      guardianId = guardian.ID;
      await repo.updateGuardian(guardianId, data.guardian);

    } else {
      guardianId = await repo.createGuardian(data.guardian);
    }
  }
  else {
    guardianId = null;
  }

  await repo.updatePatient(id, {
    ...data,
    guardian_id: guardianId,
  });

  // invalidate cache
  await redis.del(`patient:${userId}:${id}`);
};


// DELETE (check ownership + business rule)
export const deletePatient = async (id, userId) => {
  const patient = await repo.findPatientById(id, userId);

  if (!patient) throw new Error("Forbidden");

  // const count = await repo.countAppointmentsByPatient(id);

  // if (count > 0) {
  //   throw new Error("Patient has appointment");
  // }

  await repo.deletePatient(id);

  await redis.del(`patient:${userId}:${id}`);
};