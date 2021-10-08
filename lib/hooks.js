import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import AuthContext from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';

export function useGet(url, query) {
    const fetcher = (url) => axios({
        method: 'GET',
        baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
        url,
        params: query,
        withCredentials: true,
    }).then(res => res.data);
    const { data, error } = useSWR([url, query], fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
    };
}

export function useUser(redirectTo = undefined, redirectIfFound = false) {
    const { isLoggedIn, logIn } = useContext(AuthContext);
    const { setCurrentUser } = useContext(UserContext);
    const { data: user, isLoading, isError } = useGet('/auth/user');
    const router = useRouter();

    useEffect(() => {
        if (user) {
            logIn();
            setCurrentUser(user);
        }
    }, [user]);

    useEffect(() => {
        if (!redirectTo || isLoading) return;
        if (
            // If redirectTo is set, redirect if the user was not found.
            (!isLoggedIn && redirectTo && !redirectIfFound && !user) ||
            // If redirectIfFound is also set, redirect if the user was found
            (isLoggedIn && redirectIfFound && user)
        ) {
            console.log('redirect to ' + redirectTo);
            router.replace(redirectTo);
        }
    }, [redirectTo, redirectIfFound, isLoading, user, isLoggedIn]);

    return { user, isLoading, isError };
}