/* eslint-disable @next/next/no-img-element */
import Container from '../components/Container'
import axios from 'axios'
import ListMoves from '../components/ListMoves'
import Link from 'next/link'

const Description = ({ name, image, moves }) => {
	return (
		<Container>
			<div className="d-flex justify-content-between bg-light align-items-center mb-4">
				<h1 className="text-uppercase">{name}</h1>
				<div className="">
					<Link href="/">
						<a className="btn btn-outline-secondary">Volver</a>
					</Link>
				</div>
			</div>

			<div className="col-md-3 col-xs-1 my-2">
				<div className="px-3">
					<img
						src={image}
						className="img-thumbnail rounded-start"
						alt={`image of ${name}`}
					/>
				</div>
			</div>
			<div className="col-md-4 col-xs-1">
				<ListMoves moves={moves} />
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
