import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: "John Doe", roles: ["ADMIN", "PERSONAL"], groups: ["GROUP_1", "GROUP_2"] },
    { id: 2, name: "Grabriel Monroe", roles: ["PERSONAL"], groups: ["GROUP_1", "GROUP_2"] },
    { id: 3, name: "Alex Xavier", roles: ["PERSONAL"], groups: ["GROUP_2"] },
    { id: 4, name: "Jarvis Khan", roles: ["ADMIN", "PERSONAL"], groups: ["GROUP_2"] },
    { id: 5, name: "Martines Polok", roles: ["ADMIN", "PERSONAL"], groups: ["GROUP_1"] },
    { id: 6, name: "Gabriela Wozniak", roles: ["VIEWER", "PERSONAL"], groups: ["GROUP_1"] }
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  create(payload: Omit<User, 'id'>): User {
    const nextId = this.users.reduce((max, u) => Math.max(max, u.id), 0) + 1;
    const user: User = { id: nextId, ...payload };
    this.users.push(user);
    return user;
  }

  update(id: number, patch: Partial<User>): User {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    const updated = { ...this.users[idx], ...patch };
    this.users[idx] = updated;
    return updated;
  }

  delete(id: number): void {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    this.users.splice(idx, 1);
  }

  // get users that given user (by id) can manage: admins can manage users within their groups
  getManagedUsersById(adminId: number): User[] {
    const user = this.findById(adminId);
    if (!user) throw new NotFoundException('User not found');

    if (!user.roles.includes('ADMIN')) return [];

    const adminGroups = new Set(user.groups);

    return this.users.filter(u => u.id !== adminId && u.groups.some(g => adminGroups.has(g)));
  }
}
