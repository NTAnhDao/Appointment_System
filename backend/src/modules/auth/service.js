// src/modules/auth/service.js
import bcrypt from 'bcrypt';
import authRepo from './repository.js';
import { generateToken } from '../../config/jwt.js';

class AuthService {
    async register(data) {
        const existingUser = await authRepo.findUserByPhone(data.phone);
        if (existingUser) {
            throw new Error('Số điện thoại này đã được đăng ký.');
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(data.password, salt);

        const newUserId = await authRepo.createUser({
            ...data,
            passwordHash
        });

        return {
            ID: newUserId,
            FULL_NAME: data.fullName,
            EMAIL: data.email,
            PHONE: data.phone
        };
    }

    async login(phone, password) {
        const user = await authRepo.findUserByPhone(phone);
        if (!user) {
            throw new Error('Số điện thoại hoặc mật khẩu không chính xác.');
        }

        let isValidPassword = false;

        if (user.PASSWORD_HASH.startsWith("$2b$")) {
            isValidPassword = await bcrypt.compare(password, user.PASSWORD_HASH);
        } 
        else {
            isValidPassword = password === user.PASSWORD_HASH;
        }
        if (!isValidPassword) {
            throw new Error('Số điện thoại hoặc mật khẩu không chính xác.');
        }

        const token = generateToken({
            id: user.ID,
            phone: user.PHONE
        });

        return { user, token };
    }
}

export default new AuthService();