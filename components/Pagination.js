const Pagination = ({ next, prev, action }) => {
	return (
		<nav className="mt-4">
			<ul className="pagination justify-content-center">
				<li
					className={`page-item ${!prev ? 'disabled' : ''}`}
					onClick={() => action(prev)}
				>
					<a className="page-link">Previous</a>
				</li>
				<li
					className={`page-item ${!next ? 'disabled' : ''}`}
					onClick={() => action(next)}
				>
					<a className="page-link">Next</a>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination
