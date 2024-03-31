import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const axiosMainUtil: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_MAIN_URL,
});

axiosMainUtil.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const axiosCourseUtil: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_COURSE_URL,
});

axiosCourseUtil.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const axiosForumutil: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_FORUM_URL,
});

axiosForumutil.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const axiosSocketUtil: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_FORUM_SOCKET_URL,
});

axiosSocketUtil.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { axiosMainUtil, axiosCourseUtil, axiosForumutil, axiosSocketUtil };
