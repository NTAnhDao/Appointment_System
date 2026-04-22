export const mapPatientDTO = (data) => ({
  full_name: data.full_name?.trim(),
  gender: data.gender,
  dob: new Date(data.dob),
  identity_number: data.identity_number,
  bhyt: data.bhyt || null,
  phone: data.phone,
  email: data.email || null,

  province: data.province,
  ward: data.ward,
  address_detail: data.address_detail,

  job: data.job,
  ethnicity: data.ethnicity,
  relation: data.relation,

  guardian: data.guardian || null
});