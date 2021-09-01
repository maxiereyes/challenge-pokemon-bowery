import { useRouter } from 'next/dist/client/router'
import { useState, useEffect } from 'react'
import CardItem from '../components/CardItem'
import Container from '../components/Container'
import CustomError from '../components/Error'
import Pagination from '../components/Pagination'
import { getAllPokemon, getPokemonName } from '../services/pokeapi'

export default function Home() {
	const router = useRouter()

	const [data, setData] = useState({
		pokemon: [],
		next: '',
		prev: '',
	})
	const [error, setError] = useState('')
	const [searchInput, setSearchInput] = useState('')

	const getData = async (offset, limit) => {
		try {
			const data = await getAllPokemon(offset, limit)
			setData({
				pokemon: data.results,
				next: data.next,
				prev: data.previous,
			})
		} catch (error) {
			setError(error.message)
		}
	}

	const getPrevOrNextData = async (url) => {
		const queryParams = url.split('?')[1]
		const params = new URLSearchParams(queryParams)
		const offset = params.get('offset')
		const limit = params.get('limit')
		await getData(offset, limit)
	}

	const handleChange = ({ target: { value } }) => {
		setSearchInput(value)
		if (!value.length) {
			getData(0, 20)
		}
	}

	const searchPokemonName = async (e) => {
		e.preventDefault()
		try {
			const name = searchInput
			const data = await getPokemonName(name)
			if (!data.hasOwnProperty('results')) {
				setData({
					pokemon: [
						{
							name: data.name,
							url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
						},
					],
					next: '',
					prev: '',
				})
			} else {
				setData({
					pokemon: data.results,
					next: data.next,
					prev: data.previous,
				})
			}
		} catch (error) {
			setError(error.message)
		}
	}

	useEffect(() => {
		if (localStorage.getItem('token') === '') {
			router.push({
				pathname: '/login',
			})
		}
		getData(0, 20)
	}, [])

	if (error) {
		return <CustomError message={error} />
	}

	return (
		<div>
			<Container>
				<div className="d-flex p-2 my-2 w-50 justify-content-center align-items-center">
					<input
						className="form-control me-2"
						type="search"
						placeholder="Search"
						name="search"
						onChange={handleChange}
					/>
					<button
						className={`btn btn-outline-secondary`}
						onClick={searchPokemonName}
					>
						Search
					</button>
				</div>
				{!data.pokemon.length ? (
					<h1>Not found data</h1>
				) : (
					<div className="d-flex flex-wrap justify-content-evenly">
						{data.pokemon.map((item, index) => (
							<CardItem key={index} name={item.name} url={item.url} />
						))}
					</div>
				)}
				<Pagination
					next={data.next}
					prev={data.prev}
					action={getPrevOrNextData}
				/>
			</Container>
		</div>
	)
}
