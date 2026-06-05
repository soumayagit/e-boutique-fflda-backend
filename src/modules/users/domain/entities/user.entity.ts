// user.entity.ts
export class UserEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: string;
  createdAt: Date;

  static fromPrisma(user: any): UserEntity {
    const entity = new UserEntity();
    entity.id        = user.id;
    entity.email     = user.email;
    entity.firstName = user.firstName ?? '';
    entity.lastName  = user.lastName  ?? '';
    entity.phone     = user.phone     ?? '';
    entity.role      = user.role;
    entity.createdAt = user.createdAt;
    return entity;
  }
}