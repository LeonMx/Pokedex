import axios from 'axios'
import axiosRetry from 'axios-retry'
import { NamedAPIResource, Pokemon, Type } from 'utils/types'

const client = axios.create({ baseURL: 'https://pokeapi.co/api/v2' })
axiosRetry(client, { retries: 3 })

export type ResponseResourseList = {
  count: number
  next: string | null
  previous: string | null
  results: NamedAPIResource[]
}

type PageParams = {
  offset?: number
  limit?: number
}

type IdOrNameParam = string

const requestResourseLists = <T extends ResponseResourseList>(
  resourse: string
): ((params?: PageParams) => Promise<T>) => {
  return async (params) =>
    await client
      .get<T>(resourse, { params })
      .then(({ data }) => data)
}

const requestResourse = <T>(resourse: string): ((idOrName: IdOrNameParam) => Promise<T>) => {
  return async (idOrName) => await client.get<T>(`${resourse}/${idOrName}`).then(({ data }) => data)
}

export const getPokemons = requestResourseLists('pokemon')

export const getPokemon = requestResourse<Pokemon>('pokemon')

export const getTypes = requestResourseLists('type')

export const getType = requestResourse<Type>('type')
