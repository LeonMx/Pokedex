import { FC, useEffect, memo } from 'react'
import tw from 'twin.macro'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { PokemonData } from 'utils/types'
import Spinner from 'components/Spinner'
import PokemonCard from './PokemonCard'

type PokemonCardsProps = {
  pokemons: Array<PokemonData>
  loading?: boolean
  onLastCardSeen?: () => void
}

const WrapperPokemonCard = tw.div`
  flex
  flex-wrap
  justify-center
`

const PokemonCards: FC<PokemonCardsProps> = ({ pokemons, loading, onLastCardSeen }) => {
  const [lastCardRef, isLastCardSeen] = useInView()

  useEffect(() => {
    if (!loading && isLastCardSeen) {
      onLastCardSeen && onLastCardSeen()
    }
  }, [loading, isLastCardSeen, onLastCardSeen])

  return (
    <WrapperPokemonCard>
      {pokemons.map((pokemon, index) => (
        <Link key={index} href={`/pokemon/${pokemon.name}`}>
          <a ref={index === pokemons.length - 1 ? lastCardRef : null}>
            <PokemonCard pokemon={pokemon} />
          </a>
        </Link>
      ))}
      <div css={tw`flex flex-grow w-full justify-center m-4`}>{loading && <Spinner />}</div>
    </WrapperPokemonCard>
  )
}

export default memo(PokemonCards)
