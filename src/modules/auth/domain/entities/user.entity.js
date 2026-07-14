"use strict";
// src/modules/auth/domain/entities/user.entity.ts
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
var UserEntity = /** @class */ (function () {
    function UserEntity() {
    }
    Object.defineProperty(UserEntity.prototype, "fullName", {
        get: function () {
            return "".concat(this.firstName, " ").concat(this.lastName);
        },
        enumerable: false,
        configurable: true
    });
    UserEntity.prototype.isAdmin = function () {
        return [Role.SUPER_ADMIN, Role.ADMIN].includes(this.role);
    };
    UserEntity.prototype.hasRole = function () {
        var roles = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            roles[_i] = arguments[_i];
        }
        return roles.includes(this.role);
    };
    return UserEntity;
}());
exports.UserEntity = UserEntity;
