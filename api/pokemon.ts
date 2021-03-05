import axios from 'axios'
import axiosRetry from 'axios-retry'
import { NamedAPIResource, Pokemon, PokemonType } from 'utils/types'

const client = axios.create({ baseURL: 'https://pokeapi.co' })
axiosRetry(client, { retries: 3 })

export type ResponseGetPokemons = {
  count: number
  next: string | null
  previous: string | null
  results: NamedAPIResource[]
}

type ParamsGetPokemons = {
  offset?: number
  limit?: number
}

export type ResponseGetPokemon = Pokemon

type ParamsGetPokemon = {
  idOrName?: string
}

export type ResponseGetPokemonTypes = Array<PokemonType>

export const getPokemons = async (params?: ParamsGetPokemons): Promise<ResponseGetPokemons> =>
  await client
    .get<ResponseGetPokemons>('api/v2/pokemon', { params })
    .then(({ data }) => data)

export const getPokemon = async ({ idOrName }: ParamsGetPokemon): Promise<ResponseGetPokemon> =>
  await client.get<ResponseGetPokemon>(`api/v2/pokemon/${idOrName}`).then(({ data }) => data)

export const getPokemonTypes = async (): Promise<ResponseGetPokemonTypes> =>
  await client.get('api/v2/type').then(({ data }) => data)
