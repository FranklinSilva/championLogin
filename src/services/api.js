import axios from 'axios';

export var url = 'https://api.github.com/'

const api = axios.create({
    baseURL: url
})
export default api;
