import React from 'react';
import LayoutAdmin from 'src/layouts/AdminLayout';

const AdminPage: React.FC = () => {
    return (
        <LayoutAdmin>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p>Welcome to the admin panel!</p>
            </div>
        </LayoutAdmin>
    );
};

export default AdminPage;
