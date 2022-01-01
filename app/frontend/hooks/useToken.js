import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useJwt } from "react-jwt";

export default function useToken() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const { decodedToken, isExpired, reEvaluateToken } = useJwt(cookies.token && cookies.token.token);
    const [tkn, setTkn] = useState(cookies.token)

    useEffect(async () => {
        if (cookies.token) {
            await reEvaluateToken(cookies.token && cookies.token.token)
            setTkn({ ...decodedToken, ...cookies.token })
        } else {
            setTkn(undefined)
        }
    }, [cookies])

    useEffect(async () => {
        if (isExpired) removeToken()
    }, [isExpired])

    const setToken = async (token) => {
        await setCookie('token', token, { path: '/' });
    }

    const removeToken = async () => {
        await removeCookie('token', {})
    }

    return {
        token: tkn,
        setToken: setToken,
        removeToken: removeToken,
    }
}