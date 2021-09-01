import CardItem from '../components/CardItem'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { getAllPokemon } from '../services/pokeapi'

export default function Home() {
	const router = useRouter()

	const [data, setData] = useState({
		pokemon: [],
		next: '',
		prev: '',
	})

	const getData = async (offset, limit) => {
		try {
			const data = await getAllPokemon(offset, limit)
			setData({
				pokemon: data.results,
				next: data.next,
				prev: data.previous,
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getData(0, 20)
	}, [])

	const getOffsetAndLimit = async (url) => {
		const queryParams = url.split('?')[1]
		const params = new URLSearchParams(queryParams)
		const offset = params.get('offset')
		const limit = params.get('limit')
		await getData(offset, limit)
	}

	/* const goItemDescription = (url) => {
		const id = url.split('/')[6]
		router.push({
			pathname: '/description',
			query: {
				id,
			},
		})
	} */

	return (
		<div>
			<Container>
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
					action={getOffsetAndLimit}
				/>
			</Container>
		</div>
	)
}
