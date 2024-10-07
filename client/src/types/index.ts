export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }
  
export type UserRole = 'admin' | 'user' | 'guest';

