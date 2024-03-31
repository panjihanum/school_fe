interface CourseId {
    userId: string;
    courseId: string;
}

export interface CourseEnrollment {
    id: CourseId;
    active: boolean;
}
export interface Course {
    id: string;
    teacherId: string;
    title: string;
    description: string;
    effectiveDate: string | null;
    expiryDate: string | null;
    isActive: boolean;
    enrollments: Array<CourseEnrollment>
}
