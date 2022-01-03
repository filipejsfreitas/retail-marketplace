import TokenContext from "components/Context/TokenContext"
import { useContext } from "react"
import { useRouter } from "next/router"

export default function useFetchAuth() {
    const { token } = useContext(TokenContext)
    const router = useRouter()

    const fetchAuth = async (url, options = {}) => {
        const rep = await fetch(url, token ? {
            ...options,
            headers: {
                'Authorization': 'Bearer ' + token.token,
                ...(options.headers ?? {})
            }
        } : options)
        if(rep.status === 401){
            router.replace("/401")
        }
        return rep
    }

    return {
        fetchAuth: fetchAuth,
    }
}