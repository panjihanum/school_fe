import React from 'react';
import LayoutTeacher from 'src/layouts/TeacherLayout';

const TeacherPage: React.FC = () => {
    return (
        <LayoutTeacher>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
                <p>Welcome to the teacher panel!</p>
            </div>
        </LayoutTeacher>
    );
};

export default TeacherPage;
