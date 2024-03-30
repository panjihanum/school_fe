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

export { axiosMainUtil };
