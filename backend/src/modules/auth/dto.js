// src/modules/auth/dto.js
class AuthDto {
    static toUserResponse(user) {
        if (!user) return null;
        return {
            id: user.ID,
            fullName: user.FULL_NAME,
            email: user.EMAIL,
            phone: user.PHONE,
            createdAt: user.CREATED_AT
        };
    }
}

export default AuthDto;