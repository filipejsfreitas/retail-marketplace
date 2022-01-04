import TokenContext from "components/Context/TokenContext"
import { useContext } from "react"
import { useRouter } from "next/router"
import useToken from "./useToken"

export default function useFetchAuth(opts={}) {
    const { token } = useContext(TokenContext) ?? useToken()
    const router = useRouter()
    const onUnauthorized = opts.onUnauthorized ?? (() => router.replace("401"))

    const fetchAuth = async (url, options = {}) => {
        const rep = await fetch(url, token ? {
            ...options,
            headers: {
                'Authorization': 'Bearer ' + token.token,
                ...(options.headers ?? {})
            }
        } : options)
        if(rep.status === 401){
            onUnauthorized()
        }
        console.debug(rep)
        if(rep.status === 400) console.debug(await rep.json())
        return rep
    }

    return {
        fetchAuth: fetchAuth,
    }
}