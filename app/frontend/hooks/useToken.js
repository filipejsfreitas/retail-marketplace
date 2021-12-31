import { useCookies } from 'react-cookie';

export default function useToken() {
    const [cookies, setCookie] = useCookies(['token']);

    const setToken = (token) => {
        setCookie(cs => ({ ...cs, token: token }))
    }

    return {
        token: cookies.token,
        setToken: setToken,
    }
}