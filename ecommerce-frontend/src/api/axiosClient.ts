import axios from 'axios';

const axiosClient = axios.create({
    // Replace with your actual Render URL after you create the Render service
    baseURL: import.meta.env.PROD 
        ? 'https://your-backend-name.onrender.com/api/' 
        : 'http://127.0.0.1:8000/api/',
});

export default axiosClient;