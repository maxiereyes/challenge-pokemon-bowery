import styles from './CardItem.module.css'

const CardItem = (props) => {
	return (
		<div
			className={`card col-12 col-sm-4 col-md-2 m-2  shadow ${styles.custom_cursor}`}
			onClick={props.action}
		>
			<div className="card-body">
				<h5 className="card-title lead text-uppercase">{props.name}</h5>
			</div>
		</div>
	)
}

export default CardItem
