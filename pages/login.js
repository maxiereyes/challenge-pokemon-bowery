import { useRouter } from 'next/dist/client/router'
import Container from '../components/Container'
import axios from 'axios'
import { useState } from 'react'

const Login = () => {
	const router = useRouter()

	const [dataLogin, setDataLogin] = useState({
		email: '',
		password: '',
	})

	const handleChange = ({ target: { name, value } }) => {
		event.preventDefault()
		setDataLogin((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const loginUser = async (event) => {
		event.preventDefault()
		try {
			const { data } = await axios.post(
				'https://reqres.in/api/login',
				dataLogin
			)

			router.push({
				pathname: '/',
			})
		} catch (error) {
			return { error }
		}
	}

	return (
		<div>
			<Container>
				<h1>Login</h1>
				<form onSubmit={loginUser}>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							aria-describedby="emailHelp"
							onChange={handleChange}
							name="email"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							onChange={handleChange}
							name="password"
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</Container>
		</div>
	)
}

export default Login
