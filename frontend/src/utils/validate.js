const validateForm = (formData, isRegister = false) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const phoneRegex = /^\d{10}$/;

  // ✅ LUÔN kiểm tra phone (login + register đều cần)
  if (!formData.phone?.trim()) {
    return "Số điện thoại không được để trống";
  }

  if (!phoneRegex.test(formData.phone)) {
    return "Số điện thoại phải gồm đúng 10 chữ số";
  }

  // ✅ CHỈ register mới cần thêm
  if (isRegister) {
    if (!formData.fullName?.trim()) {
      return "Họ và tên không được để trống";
    }

    if (!formData.email?.trim()) {
      return "Email không được để trống";
    }

    if (!emailRegex.test(formData.email)) {
      return "Email không đúng định dạng";
    }
  }

  // ✅ PASSWORD (cả login + register)
  if (!formData.password) {
    return "Mật khẩu không được để trống";
  }

  if (formData.password.length < 8) {
    return "Mật khẩu phải ít nhất 8 ký tự";
  }

  if (!passwordRegex.test(formData.password)) {
    return "Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt";
  }

  return null;
};

export default validateForm;