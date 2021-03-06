import { useState, useEffect, useCallback } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { getPokemons, getPokemon } from 'api/pokemon'
import { isPokemonResolved, PokemonData } from 'utils/types'
import PokemonCards from 'components/PokemonCards'

const LIMIT = 20
export const CARDS_ID = 'pokemon_cards'

type IndexPageProps = {
  pokemons?: Array<PokemonData>
  noLoadMore?: boolean
  onLoadNextPage?: () => void
}

const IndexPage: NextPage<IndexPageProps> = ({ pokemons, noLoadMore, onLoadNextPage }) => {
  const [loadingPokemonList, setLoadingPokemonList] = useState(false)
  const [isLastCardSeen, setIsLastCardSeen] = useState(false)
  const [noMore, setNoMore] = useState(noLoadMore)
  const [pokemonsMap] = useState(new Map<PokemonData['name'], PokemonData>())
  const [pokemonsBacklog, setPokemonsBacklog] = useState(pokemons ?? [])
  const [pokemonsLoaded, setPokemonsLoaded] = useState<string[]>([])
  const [pokemonList, setPokemonList] = useState(pokemons)
  const [page, setPage] = useState(pokemons ? 1 : 0)

  const loadMorePokemos = useCallback((): void => {
    const offset = page * LIMIT

    getPokemons({ offset, limit: LIMIT }).then((response) => {
      setPokemonsBacklog(response.results)
    })

    setPage((prevPage) => prevPage + 1)
    setLoadingPokemonList(true)
  }, [page])

  const handleLastCardSeen = () => {
    setIsLastCardSeen(true)
    onLoadNextPage && onLoadNextPage()
  }

  useEffect(() => {
    if (page && !pokemonsBacklog.length) {
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

    pokemonsBacklog.map((pokemon) => {
      const { name } = pokemon

      // is not necesary upgrade pokemon data when was before resolved
      if (isPokemonResolved(pokemon)) {
        return
      }

      setPokemonToList(pokemon)

      return getPokemon(name)
        .then((pokemon) => {
          setPokemonToList(pokemon)
          setPokemonsLoaded((prev) => [...prev, name])
          return pokemon
        })
        .catch(async () => {
          return
        })
    })
  }, [page, pokemonsBacklog, pokemonsMap])

  useEffect(() => {
    const allPokemonLoaded = pokemonsBacklog.every(({ name }) => pokemonsLoaded.includes(name))

    // Wait to load all pokemon loaded
    if (allPokemonLoaded) {
      setLoadingPokemonList(false)
    }
  }, [pokemonsBacklog, pokemonsLoaded])

  useEffect(() => {
    if (page === 0) {
      loadMorePokemos()
    }
  }, [page, loadMorePokemos])

  useEffect(() => {
    if (!noMore && !loadingPokemonList && isLastCardSeen) {
      loadMorePokemos()
    }
  }, [noMore, loadingPokemonList, isLastCardSeen, loadMorePokemos])

  return (
    <>
      <PokemonCards
        data-testid={CARDS_ID}
        pokemons={pokemonList}
        loading={loadingPokemonList}
        onLastCardSeen={handleLastCardSeen}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const response = await getPokemons().catch(() => undefined)

  return {
    props: {
      pokemons: response?.results ?? [],
    },
  }
}

export default IndexPage
