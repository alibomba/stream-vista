import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/admin`,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosClient.interceptors.request.use(
    (config) => {
        const adminAccessToken = localStorage.getItem('adminAccessToken');
        if (adminAccessToken) {
            config.headers['Authorization'] = `Bearer ${adminAccessToken}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
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
                    refreshToken: localStorage.getItem('adminRefreshToken') || ''
                }
            })
                .then(res => {
                    const { accessToken } = res.data;
                    localStorage.setItem('adminAccessToken', accessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                    return axiosClient(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        }
        return Promise.reject(error);
    }
)

export default axiosClient;