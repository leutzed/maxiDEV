import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.maxithlon.com/maxi-xml/',
});

export default api;