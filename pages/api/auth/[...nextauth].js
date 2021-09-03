import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { postLogin } from '../../../services/user'

export default NextAuth({
	providers: [
		Providers.Credentials({
			id: 'login_custom',
			name: 'Login',
			async authorize(credentials) {
				try {
					const res = await postLogin(credentials)
					if (res.status === 200) {
						return res.data
					}

					return null
				} catch (error) {
					throw new Error(error.message)
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
		error: '/login',
	},
	callbacks: {
		async signIn(user, account, profile) {
			if (user.token) {
				user.email = profile.email
				return true
			}

			return false
		},
		async session(session, token) {
			return session
		},
		async jwt(token, user, account, profile, isNewUser) {
			if (user?.token) {
				token.accessToken = user.token
			}
			return token
		},
	},
})
