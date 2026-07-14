"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    id;
    email;
    firstName;
    lastName;
    phone;
    role;
    createdAt;
    static fromPrisma(user) {
        const entity = new UserEntity();
        entity.id = user.id;
        entity.email = user.email;
        entity.firstName = user.firstName ?? '';
        entity.lastName = user.lastName ?? '';
        entity.phone = user.phone ?? '';
        entity.role = user.role;
        entity.createdAt = user.createdAt;
        return entity;
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map