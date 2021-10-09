import axios from 'axios';

export function get(url, query) {
    return axios({
        method: 'GET',
        baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
        url,
        params: query,
        withCredentials: true,
    }).then(res => res.data);
}