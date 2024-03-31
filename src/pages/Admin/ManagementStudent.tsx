import React, { useState, useEffect } from 'react';
import AdminLayout from 'src/layouts/AdminLayout';
import { useLoading } from 'src/hooks/LoadingContext';
import { axiosMainUtil } from 'src/util/axiosUtil';
import AddStudentModal from 'src/components/AddStudentModal';
import EditStudentModal from 'src/components/EditStudentModal';
import { Student } from 'src/interface/student';
import { toast } from 'react-toastify';

const ManagementStudent: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const { setLoading } = useLoading();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axiosMainUtil.get('/users/list-students');
            setStudents(response.data);
        } catch (error) {
            const axiosError = error as any;
            if (axiosError.response) {
                toast(axiosError.response.data.message, {
                    type: 'error'
                });
            } else if (axiosError.request) {
                toast('Network error. Please try again later.', {
                    type: 'error'
                });
            } else {
                toast('An error occurred. Please try again later.', {
                    type: 'error'
                });
            }
        }
        setLoading(false);
    };

    const openEditModal = (student: Student) => {
        setSelectedStudent(student);
        setIsEditModalOpen(true);
    };

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between mb-4 items-center mb-8">
                    <h1 className="text-3xl font-bold">Siswa Management</h1>
                    <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => setIsAddModalOpen(true)}>
                        Tambah Siswa
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td className="border border-gray-300 px-4 py-2">{(student.firstName?.concat(" ") ?? "").concat(student.lastName ?? "")}</td>
                                    <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{student.role}</td>
                                    <td className="border border-gray-300 px-4 py-2 flex items-center justify-center">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2" onClick={() => openEditModal(student)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isEditModalOpen && selectedStudent && <EditStudentModal onRefresh={fetchStudents} student={selectedStudent} onClose={() => setIsEditModalOpen(false)} />}
            {isAddModalOpen && <AddStudentModal onRefresh={fetchStudents} onClose={() => setIsAddModalOpen(false)} />}
        </AdminLayout>
    );
};

export default ManagementStudent;
