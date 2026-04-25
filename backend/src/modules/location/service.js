import data from "./data/locations.json" assert { type: "json" }

export const getProvinces = () => data.province

export const getCommunesByProvince = (provinceId) =>
  data.commune.filter(c => c.idProvince === provinceId)