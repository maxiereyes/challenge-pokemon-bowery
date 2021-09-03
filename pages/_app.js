import { Provider } from 'next-auth/client'
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Component {...pageProps} />
		</Provider>
	)
}
export default MyApp
