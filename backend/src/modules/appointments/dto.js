export const mapAppointmentDTO = (data) => ({
  schedule_id: data.schedule_id,
  patient_id: data.patient_id,
  fee: data.fee,
  note: data.note || null
});