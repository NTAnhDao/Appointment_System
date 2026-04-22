import { verifyToken } from '../../config/jwt.js';

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Bạn chưa đăng nhập'
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = verifyToken(token);

        // QUAN TRỌNG
        req.user = {
            id: decoded.id,
            phone: decoded.phone
        };

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ'
        });
    }
};