import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    },
    (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
    response => response,
    (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && error?.response?.data?.message === 'jwt expired') {
            return axiosClient({
                method: 'post',
                url: '/refresh',
                data: {
                    token: localStorage.getItem('refreshToken') || ''
                }
            })
                .then(res => {
                    const { accessToken } = res.data;
                    localStorage.setItem('accessToken', accessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosClient(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                })
        }
        return Promise.reject(error);
    }
)

export default axiosClient;