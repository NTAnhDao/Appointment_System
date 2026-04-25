import * as service from "./service.js"

export const getProvinces = (req, res) => {
  res.json(service.getProvinces())
}

export const getCommunes = (req, res) => {
  res.json(service.getCommunesByProvince(req.params.provinceId))
}