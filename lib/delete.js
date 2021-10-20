import axios from 'axios';

export function del(url, query) {
    return axios({
        method: 'DELETE',
        baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
        url,
        params: query,
        withCredentials: true,
    }).then(res => res.data);
}