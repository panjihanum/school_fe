import React, { useState, useEffect } from 'react';
import AdminLayout from 'src/layouts/AdminLayout';
import { useLoading } from 'src/hooks/LoadingContext';
import { axiosCourseUtil } from 'src/util/axiosUtil';
import { Course } from 'src/interface/course';
import AddCourseModal from 'src/components/AddCourseModal';
import EditCourseModal from 'src/components/EditCourseModal';
import moment from 'moment';

const ManagementCourse: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const { setLoading } = useLoading();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await axiosCourseUtil.get("/admin/courses");
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
        setLoading(false);
    };

    const openEditModal = (course: Course) => {
        setSelectedCourse(course);
        setIsEditModalOpen(true);
    };

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between mb-4 items-center mb-8">
                    <h1 className="text-3xl font-bold">Course Management</h1>
                    <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => setIsAddModalOpen(true)}>
                        Add Course
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Title</th>
                                <th className="border border-gray-300 px-4 py-2">Description</th>
                                <th className="border border-gray-300 px-4 py-2">Effective Date</th>
                                <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.id}>
                                    <td className="border border-gray-300 px-4 py-2">{course.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{course.description}</td>
                                    <td className="border border-gray-300 px-4 py-2">{course.effectiveDate ? moment(course.effectiveDate).format("YYYY-MM-DD") : ""}</td>
                                    <td className="border border-gray-300 px-4 py-2">{course.expiryDate ? moment(course.expiryDate).format("YYYY-MM-DD") : ""}</td>
                                    <td className="border border-gray-300 px-4 py-2 flex items-center justify-center">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2" onClick={() => openEditModal(course)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isEditModalOpen && selectedCourse && <EditCourseModal onRefresh={fetchCourses} course={selectedCourse} onClose={() => setIsEditModalOpen(false)} />}
            {isAddModalOpen && <AddCourseModal onRefresh={fetchCourses} onClose={() => setIsAddModalOpen(false)} />}
        </AdminLayout>
    );
};

export default ManagementCourse;
