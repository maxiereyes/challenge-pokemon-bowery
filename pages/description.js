import Container from '../components/Container'
import axios from 'axios'

const Description = (props) => {
	return (
		<Container>
			<div className="card mb-3">
				<div className="row g-0">
					<div className="col-md-4">
						<img
							src={props.image}
							className="img-fluid rounded-start"
							alt={`image of ${props.name}`}
						/>
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h5 className="card-title text-uppercase">{props.name}</h5>
							<p className="card-text">
								<ul className="list-group">
									{!props.moves
										? null
										: props.moves.map(({ move }, index) => (
												<li key={index} className="list-group-item">
													{move.name}
												</li>
										  ))}
								</ul>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

Description.getInitialProps = async ({ query }) => {
	try {
		const promisePokemon = axios.get(
			`https://pokeapi.co/api/v2/pokemon/${query.id}`
		)

		const promiseEvolutions = axios.get(
			`https://pokeapi.co/api/v2/evolution-chain/${query.id}/`
		)

		const [resultPromisePokemon, resultPromiseEvolutions] = await Promise.all([
			promisePokemon,
			promiseEvolutions,
		])

		const { data: pokemon } = resultPromisePokemon
		const { data: evolutions } = resultPromiseEvolutions

		return {
			name: pokemon.name,
			image: pokemon.sprites.front_default,
			moves: pokemon.moves,
			evolutions,
		}
	} catch (error) {
		return { error }
	}
}

export default Description
