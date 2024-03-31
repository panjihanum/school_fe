import { ReactNode } from 'react';
import SidebarTeacherLayout from './SidebarTeacherLayout';

const LayoutTeacher = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-screen relative z-20">
            <SidebarTeacherLayout />

            <div className="flex-1 bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg p-4">
                {children}
            </div>
        </div>
    );
};

export default LayoutTeacher;
