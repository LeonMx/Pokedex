import { useState, useEffect, useCallback, useContext } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import PokemonCards from 'components/PokemonCards'
import { getPokemons, getPokemon, ResponseResourseList } from 'api/pokemon'
import { isPokemonResolved, PokemonData } from 'utils/types'
import { SearchContext } from 'components/AppLayout'

const LIMIT = 20

type IndexPageProps = {
  pokemons?: PokemonData[]
  noLoadMore?: boolean
}

const IndexPage: NextPage<IndexPageProps> = ({ pokemons, noLoadMore }) => {
  const initPage = Math.trunc((pokemons?.length ?? 0) / LIMIT)
  const { value: searchValue } = useContext(SearchContext)
  const [loadingPokemonList, setLoadingPokemonList] = useState(false)
  const [isCardTargetSeen, setIsCardTargetSeen] = useState(false)
  const [noMore, setNoMore] = useState(noLoadMore)
  const [pokemonsMap] = useState(new Map<PokemonData['name'], PokemonData>())
  const [pokemonsBacklog, setPokemonsBacklog] = useState(pokemons ?? [])
  const [pokemonsLoaded, setPokemonsLoaded] = useState<string[]>([])
  const [pokemonList, setPokemonList] = useState(pokemons)
  const [pokemonFiltered, setPokemonFiltered] = useState<PokemonData[]>()
  const [page, setPage] = useState(initPage)

  const loadMorePokemos = useCallback((): void => {
    const offset = page * LIMIT

    getPokemons({ offset, limit: LIMIT }).then((response) => {
      setPokemonsBacklog(response.results)
    })

    setPage((prevPage) => prevPage + 1)
    setLoadingPokemonList(true)
  }, [page])

  const handleCardTargetSeen = () => void setIsCardTargetSeen(true)

  useEffect(() => {
    if (page && !pokemonsBacklog.length) {
      setLoadingPokemonList(false)
      setNoMore(true)
      return
    }

    // add new or upgrade pokemon to list
    const setPokemonToList = (pokemon: PokemonData): void => {
      pokemonsMap.set(pokemon.name, pokemon)
      // convertir el map en array para poder renderizar
      setPokemonList(Array.from(pokemonsMap.values()))
      setIsCardTargetSeen(false)
    }

    pokemonsBacklog.forEach((pokemon) => {
      const { name } = pokemon

      setPokemonToList(pokemon)

      // is not necesary upgrade pokemon data when was before resolved
      if (isPokemonResolved(pokemon)) {
        return
      }

      getPokemon(name)
        .then((pokemon) => {
          setPokemonToList(pokemon)
        })
        .finally(() => {
          setPokemonsLoaded((prev) => [...prev, name])
        })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonsBacklog, pokemonsMap])

  useEffect(() => {
    const allPokemonLoaded = pokemonsBacklog.every(({ name }) => pokemonsLoaded.includes(name))

    // Wait to load all pokemon loaded
    if (allPokemonLoaded) {
      setLoadingPokemonList(false)
    }
  }, [pokemonsBacklog, pokemonsLoaded])

  useEffect(() => {
    !pokemons?.length && loadMorePokemos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons])

  useEffect(() => {
    if (!noMore && !loadingPokemonList && isCardTargetSeen) {
      loadMorePokemos()
    }
  }, [noMore, loadingPokemonList, isCardTargetSeen, loadMorePokemos])

  useEffect(() => {
    if (!searchValue) {
      setPokemonFiltered(pokemonList)
    }

    setPokemonFiltered(
      pokemonList?.filter((pokemon) => {
        if (isPokemonResolved(pokemon)) {
          return (
            pokemon.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            pokemon.id.toString().includes(searchValue.toLowerCase())
          )
        }

        return false
      })
    )
  }, [pokemonList, searchValue])

  return (
    <PokemonCards
      pokemons={pokemonFiltered}
      loading={loadingPokemonList}
      positionBackForCardTarget={LIMIT / 2}
      onCardTargetSeen={handleCardTargetSeen}
    />
  )
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const response: ResponseResourseList | undefined = await getPokemons().catch(() => undefined)

  if (!response) {
    return {
      props: {
        pokemons: null,
      },
    }
  }

  const pokemons = []

  for (const result of response.results) {
    pokemons.push(await getPokemon(result.name).catch(() => undefined))
  }

  return {
    props: {
      pokemons,
    },
  }
}

export default IndexPage
