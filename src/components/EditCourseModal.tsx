import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosCourseUtil, axiosMainUtil } from 'src/util/axiosUtil';
import Modal from './Modal';
import { useLoading } from 'src/hooks/LoadingContext';
import { toast } from 'react-toastify';
import { Course } from 'src/interface/course';
import moment from 'moment';

interface EditCourseModalProps {
    course: any; // Course data to edit
    onClose: () => void;
    onRefresh: () => void;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({ course, onClose, onRefresh }) => {
    const [teachers, setTeachers] = useState([]);
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axiosMainUtil.get('/users/list-teachers');
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    const [initialValues, setInitialValues] = useState<Course>({
        id: course.id,
        title: course.title,
        description: course.description,
        effectiveDate: course.effectiveDate,
        expiryDate: course.expiryDate,
        isActive: course.isActive,
        teacherId: course.teacherId
    });

    useEffect(() => {
        setInitialValues({
            ...course,
            effectiveDate: course.effectiveDate ? moment(course.effectiveDate).format('YYYY-MM-DD') : null,
            expiryDate: course.expiryDate ? moment(course.expiryDate).format('YYYY-MM-DD') : null
        });
    }, [course]);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        effectiveDate: Yup.date().required('Effective Date is required'),
        expiryDate: Yup.date().required('Expiry Date is required'),
        isActive: Yup.boolean().required('isActive is required'),
        teacherId: Yup.string().required('Teacher is required')
    });

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            await axiosCourseUtil.put(`/admin/courses/${course.id}`, values); // Assuming course ID is available in course object
            onClose();
            onRefresh();
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

    return (
        <Modal isOpen handleClose={onClose}>
            <div className="flex flex-col p-6 space-y-4">
                <h2 className="text-lg font-semibold">Edit Course</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {({ isSubmitting }) => (
                        <Form className="space-y-2">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <Field type="text" name="title" id="title" className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2" />
                                <ErrorMessage name="title" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <Field component="textarea" type="text" name="description" id="description" className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2" />
                                <ErrorMessage name="description" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div>
                                <label htmlFor="effectiveDate" className="block text-sm font-medium text-gray-700">Effective Date</label>
                                <Field type="date" name="effectiveDate" id="effectiveDate" className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2" />
                                <ErrorMessage name="effectiveDate" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                <Field type="date" name="expiryDate" id="expiryDate" className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2" />
                                <ErrorMessage name="expiryDate" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div>
                                <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700">Teacher</label>
                                <Field as="select" name="teacherId" id="teacherId" className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2">
                                    <option value="">Select a teacher</option>
                                    {teachers.map((teacher: any) => (
                                        <option key={teacher.id} value={teacher.id}>{(teacher.firstName ?? "").concat(" ").concat(teacher.lastName)}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="teacherId" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div>
                                <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">Is Active</label>
                                <Field type="checkbox" name="isActive" id="isActive" className="mt-1" />
                                <ErrorMessage name="isActive" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div className='h-2' />
                            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">Update Course</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default EditCourseModal;
