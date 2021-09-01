import { pokeApi } from '../api/axios.config'

export const getAllPokemon = async (offset, limit) => {
	const { data } = await pokeApi.get(`/pokemon?offset=${offset}&limit=${limit}`)
	return data
}

export const getPokemonName = async (name) => {
	const { data } = await pokeApi.get(`/pokemon/${name}`)
	return data
}

export const getPokemonEvolution = async (id) => {
	const { data } = await pokeApi.get(`/evolution-chain/${id}`)
	return data
}

export const getPokemonInfoById = async (id) => {
	const { data } = await pokeApi.get(`/pokemon/${id}`)
	return data
}
