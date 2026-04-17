class AuthValidator {
    validateRegister(req, res, next) {
        const { fullName, email, phone, password } = req.body;

        if (!fullName) {
            return res.status(400).json({ success: false, message: "Họ tên không được để trống" });
        }
        

        if (!email || !email.includes("@")) {
            return res.status(400).json({ success: false, message: "Email không hợp lệ" });
        }

        if (!phone || phone.length < 10) {
            return res.status(400).json({ success: false, message: "Số điện thoại không được để trống và phải 10 chữ số" });
        }


        if (!password || password.length < 8) {
            return res.status(400).json({ success: false, message: "Mật khẩu phải >= 8 ký tự" });
        }

        next();
    }

    validateLogin(req, res, next) {
        const { phone, password } = req.body;

        if (!phone) {
            return res.status(400).json({ success: false, message: "Thiếu số điện thoại" });
        }

        if (!password) {
            return res.status(400).json({ success: false, message: "Thiếu mật khẩu" });
        }

        next();
    }
}

export default new AuthValidator();