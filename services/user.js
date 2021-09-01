import { reqresApi } from '../api/axios.config'

export const postLogin = async (payload) => {
	return await reqresApi.post('/login', payload)
}
