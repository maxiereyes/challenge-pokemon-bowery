/* eslint-disable @next/next/no-img-element */
import Container from '../components/Container'
import ListMoves from '../components/ListMoves'
import Link from 'next/link'
import { getPokemonInfoById, getPokemonEvolution } from '../services/pokeapi'
import iterateEvolution from '../helpers/evolution'

const Description = ({ name, image, moves, evolves }) => {
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
		const promisePokemon = getPokemonInfoById(query.id)
		const promiseEvolutions = getPokemonEvolution(query.id)

		const [resultPromisePokemon, resultPromiseEvolutions] = await Promise.all([
			promisePokemon,
			promiseEvolutions,
		])

		const pokemon = resultPromisePokemon
		const evolutions = resultPromiseEvolutions

		const evolves = iterateEvolution(evolutions.chain.evolves_to)

		return {
			name: pokemon.name,
			image: pokemon.sprites.front_default,
			moves: pokemon.moves,
			evolves,
		}
	} catch (error) {
		return { error }
	}
}

export default Description
