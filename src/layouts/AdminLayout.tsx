import { ReactNode } from 'react';
import SidebarAdminLayout from './SidebarAdminLayout';

const LayoutAdmin = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-screen relative z-20">
            <SidebarAdminLayout />

            <div className="flex-1 bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg p-4">
                {children}
            </div>
        </div>
    );
};

export default LayoutAdmin;
