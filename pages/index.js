import CardItem from '../components/CardItem'
import Container from '../components/Container'
import axios from 'axios'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'

export default function Home({ pokemon, next, prev }) {
	const router = useRouter()

	const [data, setData] = useState({
		pokemon: [],
		next: '',
		prev: '',
	})

	const getInitialData = async () => {
		try {
			const { data } = await axios.get(
				'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
			)
			setData({
				pokemon: data.results,
				next: data.next,
				prev: data.prev,
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getInitialData()
	}, [])

	const getData = async (url) => {
		try {
			const { data } = await axios.get(url)
			setData({
				pokemon: data.results,
				next: data.next,
				prev: data.previous,
			})
		} catch (error) {
			return { error }
		}
	}

	const goItemDescription = (url) => {
		const id = url.split('/')[6]
		router.push({
			pathname: '/description',
			query: {
				id,
			},
		})
	}

	return (
		<div>
			<Container>
				{!data.pokemon.length ? (
					<Loading />
				) : (
					<div className="card">
						{data.pokemon.map((item, index) => (
							<CardItem
								key={index}
								name={item.name}
								action={() => goItemDescription(item.url)}
							/>
						))}
					</div>
				)}
				<Pagination next={data.next} prev={data.prev} action={getData} />
			</Container>
		</div>
	)
}
