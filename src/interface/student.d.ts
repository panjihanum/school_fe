import { Moment } from "moment";

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    birthdate: string | null;
    email: string;
    role?: string;
    password?: string | null;
    username?: string | null;
}