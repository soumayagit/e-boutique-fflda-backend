"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
// user.entity.ts
var UserEntity = /** @class */ (function () {
    function UserEntity() {
    }
    UserEntity.fromPrisma = function (user) {
        var _a, _b, _c;
        var entity = new UserEntity();
        entity.id = user.id;
        entity.email = user.email;
        entity.firstName = (_a = user.firstName) !== null && _a !== void 0 ? _a : '';
        entity.lastName = (_b = user.lastName) !== null && _b !== void 0 ? _b : '';
        entity.phone = (_c = user.phone) !== null && _c !== void 0 ? _c : '';
        entity.role = user.role;
        entity.createdAt = user.createdAt;
        return entity;
    };
    return UserEntity;
}());
exports.UserEntity = UserEntity;
