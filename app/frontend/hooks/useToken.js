import { useCookies } from 'react-cookie';

export default function useToken() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const setToken = (token) => {
        setCookie('token', token, { path: '/' });
    }

    const removeToken = () => {
        removeCookie('token', {})
    }

    return {
        token: cookies.token,
        setToken: setToken,
        removeToken: removeToken,
    }
}