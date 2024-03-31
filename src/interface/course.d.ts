export interface Course {
    id: string;
    teacherId: string;
    title: string;
    description: string;
    effectiveDate: string | null;
    expiryDate: string | null;
    isActive: boolean;
}
