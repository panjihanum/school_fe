// LoginPage.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'src/hooks/AuthContext';
import { toast } from 'react-toastify';

interface FormValues {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const initialValues: FormValues = { email: '', password: '' };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const { login } = useAuth();

    const handleLogin = async (values: FormValues) => {
        try {
            login(values.email, values.password);
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
    };

    return (
        <div className='flex items-center justify-center w-full h-full p-6'>
            <div className="bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-md w-[360px]">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleLogin(values);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 text-sm">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-1 block border border-gray-200 focus:border-gray-400 w-full rounded border-gray-300 focus:outline-none px-3 py-2"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginPage;
