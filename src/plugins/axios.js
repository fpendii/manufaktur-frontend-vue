import axios from 'axios';

// Pakai environment variable supaya gampang diubah
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios;
