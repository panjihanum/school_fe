import React from 'react';
import LayoutStudent from 'src/layouts/StudentLayout';

const StudentPage: React.FC = () => {
    return (
        <LayoutStudent>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p>Welcome to the student panel!</p>
            </div>
        </LayoutStudent>
    );
};

export default StudentPage;
