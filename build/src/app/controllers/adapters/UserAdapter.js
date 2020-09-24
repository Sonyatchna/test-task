"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdapter = void 0;
class UserAdapter {
    static entityToResponse(user) {
        return {
            _id: user._id,
            email: user.email
        };
    }
}
exports.UserAdapter = UserAdapter;
