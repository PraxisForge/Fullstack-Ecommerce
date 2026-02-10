import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.PROD 
        ? 'https://ecommerce-backend-joy9.onrender.com/api/' 
        : 'http://127.0.0.1:8000/api/',
});

export default axiosClient;