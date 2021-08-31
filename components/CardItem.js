const CardItem = (props) => {
	return (
		<li
			className="list-group-item list-group-item-action"
			onClick={props.action}
		>
			<h4 className="lead text-uppercase">{props.name}</h4>
		</li>
	)
}

export default CardItem
