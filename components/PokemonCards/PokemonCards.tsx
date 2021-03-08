import { FC, useEffect, memo } from 'react'
import tw from 'twin.macro'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { PokemonData } from 'utils/types'
import Spinner from 'components/Spinner'
import PokemonCard from './PokemonCard'

export const TEST_CARDS_ID = 'pokemon_cards'

type PokemonCardsProps = {
  pokemons?: PokemonData[]
  loading?: boolean
  positionBackForCardTarget?: number
  onCardTargetSeen?: () => void
}

const WrapperPokemonCard = tw.div`
  flex
  flex-wrap
  justify-center
`

const PokemonCards: FC<PokemonCardsProps> = ({
  pokemons,
  loading,
  positionBackForCardTarget = 0,
  onCardTargetSeen,
}) => {
  const [cardTarget, isCardTargetSeen] = useInView()

  useEffect(() => {
    if (!loading && isCardTargetSeen) {
      onCardTargetSeen && onCardTargetSeen()
    }
  }, [loading, isCardTargetSeen, onCardTargetSeen])

  if (!pokemons?.length) return <div ref={cardTarget} />

  const calculateIndex = pokemons.length - 1 - positionBackForCardTarget
  const cardTargetIndex = calculateIndex < 0 ? pokemons?.length - 1 : calculateIndex

  return (
    <WrapperPokemonCard data-testid={TEST_CARDS_ID}>
      {pokemons?.map((pokemon, index) => (
        <Link key={index} href={`/pokemon/${pokemon.name}`}>
          <a className="flex justify-center" ref={index === cardTargetIndex ? cardTarget : null}>
            <PokemonCard pokemon={pokemon} />
          </a>
        </Link>
      ))}
      <div className="flex flex-grow w-full justify-center m-4">{loading && <Spinner />}</div>
    </WrapperPokemonCard>
  )
}

export default memo(PokemonCards)
