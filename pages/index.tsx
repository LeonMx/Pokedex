import { useState, useEffect, useCallback } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import tw from 'twin.macro'
import AppLayout from 'components/AppLayout'
import Header from 'components/Header'
import Search from 'components/Search'
import { getPokemons, getPokemon, ResponseGetPokemons } from 'api/pokemon'
import { isPokemonResolved, PokemonData } from 'types/pokemon'
import PokemonCards from 'components/PokemonCards'

const LIMIT = 20
const START_PAGE = 1

type IndexPageProps = {
  pokemons: Array<PokemonData>
}

const IndexPage: NextPage<IndexPageProps> = ({ pokemons }) => {
  const [loadingPokemonList, setLoadingPokemonList] = useState(false)
  const [isInputInFocus, setIsInputInFocus] = useState(false)
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

  const handleLastCardSeen = (): void => {
    setIsLastCardSeen(true)
  }

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

      return getPokemon({ name })
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
    <AppLayout>
      <Header backgroundColor="red-700">
        <Link href="/">
          <a css={[tw`mr-2 min-w-max`, isInputInFocus && tw`hidden sm:block`]}>
            <Image src="/logo.png" width={150} height={45} layout="intrinsic" />
          </a>
        </Link>

        <Search
          css={tw`flex flex-auto min-w-0 max-w-full sm:max-w-sm`}
          onFocus={() => setIsInputInFocus(true)}
          onBlur={() => setIsInputInFocus(false)}
        />
      </Header>

      <div className="container my-4 mx-auto sm:my-6">
        <PokemonCards
          pokemons={pokemonList}
          loading={loadingPokemonList}
          onLastCardSeen={handleLastCardSeen}
        />
      </div>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
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
