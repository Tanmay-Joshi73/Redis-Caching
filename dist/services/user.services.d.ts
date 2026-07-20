import { User } from "../types/user.js";
export declare const createUser: (user: User) => Promise<any>;
export declare const getUsers: () => Promise<any[]>;
export declare const getUserById: (id: number) => Promise<any>;
export declare const updateUser: (id: number, user: User) => Promise<any>;
export declare const deleteUser: (id: number) => Promise<boolean>;
//# sourceMappingURL=user.services.d.ts.map