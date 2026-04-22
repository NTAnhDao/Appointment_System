import dayjs from "dayjs";
const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
const cccdRegex = /^[0-9]{12}$/;

export const validatePatient = (req, res, next) => {
  const { full_name, phone, identity_number, dob, guardian } = req.body;

  if (!full_name) return res.status(400).json({ message: "full_name required" });

  if (!phoneRegex.test(phone))
    return res.status(400).json({ message: "Invalid phone" });

  if (!cccdRegex.test(identity_number))
    return res.status(400).json({ message: "Invalid CCCD" });

  const age = new Date().getFullYear() - new Date(dob).getFullYear();

  if (age < 18) {
    if (!guardian)
      return res.status(400).json({ message: "Guardian required" });

    if (!guardian.full_name || !cccdRegex.test(guardian.identity_number || "") || !phoneRegex.test(guardian.phone || ""))
      return res.status(400).json({ message: "Invalid guardian info" });
  }

  next();
};