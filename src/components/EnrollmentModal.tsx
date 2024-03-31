import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosCourseUtil, axiosMainUtil } from 'src/util/axiosUtil'; // Import axiosMainUtil for fetching student IDs
import Modal from './Modal';
import { useLoading } from 'src/hooks/LoadingContext';
import { toast } from 'react-toastify';
import { Course } from 'src/interface/course';
import { Student } from 'src/interface/student';

interface EnrollmentModalProps {
    onClose: () => void;
    onRefresh: () => void;
    course: Course | null;
}

interface EnrollmentData {
    courseId: string;
    studentIds: string[];
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ course, onClose, onRefresh }) => {
    const [initialValues, setInitialValues] = useState<EnrollmentData>({
        courseId: '',
        studentIds: []
    });

    useEffect(() => {
        if (course) {
            setInitialValues({ courseId: course.id, studentIds: course.enrollments.filter((val) => val.active).map((val) => val.id.userId) });
        }
    }, [course]);

    const [studentOptions, setStudentOptions] = useState<Student[]>([]);
    const { setLoading } = useLoading();

    useEffect(() => {
        fetchStudentIds();
    }, []);

    const fetchStudentIds = async () => {
        try {
            const response = await axiosMainUtil.get('/users/list-students');
            const students = response.data;
            setStudentOptions(students);
        } catch (error) {
            console.error('Error fetching student IDs:', error);
        }
    };

    const validationSchema = Yup.object().shape({
        courseId: Yup.string().required('Course ID is required'),
        studentIds: Yup.array().of(Yup.string()).required('Student IDs are required')
    });

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            await axiosCourseUtil.post("/admin/courses/enrollment", values);
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
                <h2 className="text-lg font-semibold">Enroll Students</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form className="space-y-2">
                            <div>
                                <label htmlFor="studentIds" className="block text-sm font-medium text-gray-700">Student IDs</label>
                                <div className="mt-1 border border-gray-200 rounded px-3 py-2 overflow-auto" style={{ maxHeight: '150px' }}>
                                    {studentOptions.map((student) => (
                                        <div key={student.id} className="flex items-center">
                                            <Field
                                                type="checkbox"
                                                name="studentIds"
                                                value={student.id}
                                                className="mr-2"
                                                checked={values.studentIds.includes(student.id)}
                                                onChange={(e: any) => {
                                                    const isChecked = e.target.checked;
                                                    const id = e.target.value;
                                                    const updatedStudentIds = isChecked
                                                        ? [...values.studentIds, id]
                                                        : values.studentIds.filter((studentId: string) => studentId !== id);
                                                    setFieldValue('studentIds', updatedStudentIds);
                                                }}
                                            />
                                            <label htmlFor={student.id}>{(student.firstName ?? "").concat(" ").concat(student.lastName ?? "")}</label>
                                        </div>
                                    ))}
                                </div>
                                <ErrorMessage name="studentIds" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div className='h-2' />
                            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">Enroll Students</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default EnrollmentModal;
