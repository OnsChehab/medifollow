export type UserRole = 'PATIENT' | 'PHYSICIAN' | 'NURSE' | 'COORDINATOR' | 'AUDITOR' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}
