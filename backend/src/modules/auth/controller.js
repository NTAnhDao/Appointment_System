// src/modules/auth/controller.js
import authService from './service.js';
import authDto from './dto.js';

class AuthController {
    async register(req, res) {
        try {
            const rawUser = await authService.register(req.body);
            const safeUser = authDto.toUserResponse(rawUser);

            res.status(201).json({ 
                success: true, 
                message: 'Đăng ký tài khoản thành công', 
                data: safeUser 
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { phone, password } = req.body;
            const { user, token } = await authService.login(phone, password);
            
            const safeUser = authDto.toUserResponse(user);

            res.status(200).json({ 
                success: true, 
                message: 'Đăng nhập thành công', 
                data: {
                    user: safeUser,
                    token
                } 
            });
        } catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    }
}

export default new AuthController();