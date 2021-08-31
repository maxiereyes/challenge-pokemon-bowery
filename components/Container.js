import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'

const Container = ({ children }) => {
	return (
		<div className="container-fluid p-4">
			<Head>
				<title>Challenge Pokemon</title>
			</Head>
			<div className="col mx-auto text-center">{children}</div>
		</div>
	)
}

export default Container
