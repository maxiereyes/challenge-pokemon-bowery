/* eslint-disable @next/next/no-img-element */
import Container from '../components/Container'
import ListMoves from '../components/ListMoves'
import { getPokemonInfoById, getPokemonEvolution } from '../services/pokeapi'
import iterateEvolution from '../helpers/evolution'
import CardItem from '../components/CardItem'
import { useRouter } from 'next/dist/client/router'

const Description = ({ name, image, moves, evolves }) => {
	const router = useRouter()

	const goBack = () => {
		router.back()
	}

	return (
		<Container>
			<div className="d-flex justify-content-between bg-light align-items-center mb-4">
				<h1 className="text-uppercase">{name}</h1>
				<div className="">
					<a className="btn btn-outline-secondary" onClick={goBack}>
						Volver
					</a>
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
			<div className="row mt-4 d-flex justify-content-evenly">
				<h3 className="my-2 lead text-secondary border-bottom">Evolutions</h3>
				{!evolves || evolves.length === 0 ? (
					<h1>Not found evolutions</h1>
				) : (
					evolves.map((evolution, index) => (
						<CardItem name={evolution.name} key={index} url={evolution.url} />
					))
				)}
			</div>
		</Container>
	)
}

Description.getInitialProps = async ({ query }) => {
	try {
		const promisePokemon = getPokemonInfoById(query.id)
		const promiseEvolutions = getPokemonEvolution(query.id)

		const [resultPromisePokemon, resultPromiseEvolutions] =
			await Promise.allSettled([promisePokemon, promiseEvolutions])

		const pokemon = resultPromisePokemon.value
		const evolutions = resultPromiseEvolutions.value

		const evolves = !evolutions
			? []
			: iterateEvolution(evolutions.chain.evolves_to)

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
