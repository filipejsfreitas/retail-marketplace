import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useJwt } from "react-jwt";

export const UserType = {
    CLIENT: "client",
    SELLER: "seller",
    ADMIN: "admin",
}

/* The decoded part of the token might take more time to calculate */
export default function useToken() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const { decodedToken, isExpired, reEvaluateToken } = useJwt(cookies.token && cookies.token.token);
    const [tkn, setTkn] = useState(cookies.token ? {...decodedToken, ...cookies.token} : undefined)
    const [isLogged, setIsLogged] = useState(cookies.token ? true : false)
    const [userType, setUserType] = useState(undefined)

    useEffect(() => {
        reEvaluateToken(cookies.token && cookies.token.token)
    }, [cookies])

    useEffect(() => {
        setTkn(cookies.token ? {...decodedToken, ...cookies.token} : undefined)
        setIsLogged(cookies.token ? true : false)
        setUserType(!decodedToken ? undefined
            : decodedToken.clientInfo !== null ? UserType.CLIENT
            : decodedToken.sellerInfo !== null ? UserType.SELLER
            : UserType.ADMIN)
    }, [decodedToken])

    useEffect(() => {
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
        isLogged: isLogged,
        userType: userType,
        setToken: setToken,
        removeToken: removeToken,
    }
}