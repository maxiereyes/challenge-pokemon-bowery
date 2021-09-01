import { useRouter } from 'next/dist/client/router'
import styles from './CardItem.module.css'

const CardItem = (props) => {
	const router = useRouter()

	const goItemDescription = () => {
		const id = props.url.split('/')[6]
		router.push({
			pathname: '/description',
			query: {
				id,
			},
		})
	}

	return (
		<div
			className={`card col-12 col-sm-4 col-md-3 m-2  shadow ${styles.custom_cursor}`}
			onClick={goItemDescription}
		>
			<div className="card-body">
				<h5 className="card-title lead text-uppercase">{props.name}</h5>
			</div>
		</div>
	)
}

export default CardItem
