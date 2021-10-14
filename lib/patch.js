import axios from 'axios';

export function patch(url, data) {
    return axios({
        method: 'PATCH',
        baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
        url,
        data,
        withCredentials: true,
    }).then(res => res.data);
}