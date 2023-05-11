import { useCallback, useState } from "react";

export const useHttp = () => {
	const [isLoading, setIsloading] = useState(true)
	
	const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
			try {
					setIsloading(true)
					const res = await fetch(url, {method, body, headers})
					if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`)

					setIsloading(false)
					const data = await res.json()
					return data
			} catch(e) {
					throw e
			}

	}, [])

    return {request, isLoading}
}