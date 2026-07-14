"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["MANAGER"] = "MANAGER";
    Role["SUPPORT"] = "SUPPORT";
    Role["CUSTOMER"] = "CUSTOMER";
})(Role || (exports.Role = Role = {}));
class UserEntity {
    id;
    email;
    passwordHash;
    firstName;
    lastName;
    phone;
    role;
    isActive;
    emailVerified;
    createdAt;
    updatedAt;
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    isAdmin() {
        return [Role.SUPER_ADMIN, Role.ADMIN].includes(this.role);
    }
    hasRole(...roles) {
        return roles.includes(this.role);
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map