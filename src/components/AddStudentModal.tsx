import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosMainUtil } from 'src/util/axiosUtil';
import Modal from './Modal';
import { useLoading } from 'src/hooks/LoadingContext';
import { toast } from 'react-toastify';

interface AddStudentModalProps {
    onClose: () => void;
    onRefresh: () => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ onClose, onRefresh }) => {
    const initialValues = {
        firstName: '',
        lastName: '',
        birthdate: '',
        email: '',
        password: '',
        username: '',
        isActive: true
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        birthdate: Yup.date().nullable().required('Birthdate is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        username: Yup.string().required('Username is required'),
        isActive: Yup.boolean().required('isActive is required')
    });

    const { setLoading } = useLoading();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            await axiosMainUtil.post('/users', values);
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
                <h2 className="text-lg font-semibold">Tambah Siswa</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="space-y-2">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                <Field type="text" name="firstName" id="firstName" className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2" />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <Field type="text" name="lastName" id="lastName" className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2" />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div>
                                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Birthdate</label>
                                <Field type="date" name="birthdate" id="birthdate" className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2" />
                                <ErrorMessage name="birthdate" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <Field type="text" name="username" id="username" className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2" />
                                <ErrorMessage name="username" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <Field type="email" name="email" id="email" className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2" />
                                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <Field type="password" name="password" id="password" className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2" />
                                <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div>
                                <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">Is Active</label>
                                <Field type="checkbox" name="isActive" id="isActive" className="mt-1" />
                                <ErrorMessage name="isActive" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div className='h-2' />
                            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">Tambah</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default AddStudentModal;
