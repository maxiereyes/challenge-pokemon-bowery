import { useRouter } from 'next/dist/client/router'
import Container from '../components/Container'
import { useState } from 'react'
import { postLogin } from '../services/user'

const Login = () => {
	const router = useRouter()

	const [dataLogin, setDataLogin] = useState({
		email: '',
		password: '',
	})

	const handleChange = ({ target: { name, value } }) => {
		setDataLogin((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const loginUser = async (event) => {
		event.preventDefault()
		try {
			await postLogin(dataLogin)

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
				<form onSubmit={loginUser} className="col-md-4 col">
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
