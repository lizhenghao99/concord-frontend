import axios from 'axios';

export function post(url, data) {
    return axios({
        method: 'POST',
        baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
        url,
        data,
        withCredentials: true,
    });
}