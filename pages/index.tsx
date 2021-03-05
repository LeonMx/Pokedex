import { useState, useEffect, useCallback } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { getPokemons, getPokemon, ResponseGetPokemons } from 'api/pokemon'
import { isPokemonResolved, PokemonData } from 'utils/types'
import PokemonCards from 'components/PokemonCards'

const LIMIT = 20
const START_PAGE = 1

type IndexPageProps = {
  pokemons: Array<PokemonData>
}

const IndexPage: NextPage<IndexPageProps> = ({ pokemons }) => {
  const [loadingPokemonList, setLoadingPokemonList] = useState(false)
  const [isLastCardSeen, setIsLastCardSeen] = useState(false)
  const [noMore, setNoMore] = useState(false)
  const [pokemonsMap] = useState(new Map<PokemonData['name'], PokemonData>())
  const [pokemonsBacklog, setPokemonsBacklog] = useState(pokemons)
  const [pokemonList, setPokemonList] = useState<Array<PokemonData>>(pokemons)
  const [page, setPage] = useState(START_PAGE)

  const loadMorePokemos = useCallback((): void => {
    const offset = page * LIMIT

    getPokemons({ offset, limit: LIMIT }).then((response) => {
      setPokemonsBacklog(response.results)
    })

    setPage((prevPage) => prevPage + 1)
    setLoadingPokemonList(true)
  }, [page])

  const handleLastCardSeen = () => void setIsLastCardSeen(true)

  useEffect(() => {
    if (!pokemonsBacklog.length) {
      setLoadingPokemonList(false)
      setNoMore(true)
      return
    }

    // add new or upgrade pokemon to list
    const setPokemonToList = (pokemon): void => {
      pokemonsMap.set(pokemon.name, pokemon)
      // convertir el map en array para poder renderizar
      setPokemonList(Array.from(pokemonsMap.values()))
      setIsLastCardSeen(false)
    }

    const pokemonRequests = pokemonsBacklog.map((pokemon) => {
      const { name } = pokemon

      // is not necesary upgrade pokemon data when was before resolved
      if (isPokemonResolved(pokemon)) {
        return
      }

      setPokemonToList(pokemon)

      return getPokemon({ idOrName: name })
        .then((pokemon) => {
          setPokemonToList(pokemon)
          return pokemon
        })
        .catch(async () => {
          return
        })
    })

    // Wait to load all pokemon requests
    Promise.all(pokemonRequests.filter(Boolean)).then(async () => {
      setLoadingPokemonList(false)
    })
  }, [pokemonsBacklog, pokemonsMap])

  useEffect(() => {
    if (!noMore && !loadingPokemonList && isLastCardSeen) {
      loadMorePokemos()
    }
  }, [noMore, loadingPokemonList, isLastCardSeen, loadMorePokemos])

  return (
    <PokemonCards
      pokemons={pokemonList}
      loading={loadingPokemonList}
      onLastCardSeen={handleLastCardSeen}
    />
  )
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const { results: pokemons }: ResponseGetPokemons = await getPokemons().catch(() => ({
    count: 0,
    next: null,
    previous: null,
    results: [],
  }))

  return {
    props: {
      pokemons,
    },
  }
}

export default IndexPage
