import { FC, memo } from 'react'
import tw from 'twin.macro'
import Image from 'next/image'
import Card from 'components/Card'
import Badge from 'components/Badge'
import Spinner from 'components/Spinner'
import { isPokemonResolved, PokemonData } from 'utils/types'
import { POKEMON_TYPE_COLOR, POKEMON_TYPE_COLOR_CONTRAST } from 'utils/constants'

type PokemonCardProps = {
  pokemon: PokemonData
}

const StyledCard = tw(Card)`
  flex
  flex-1
  flex-col
  items-center
  justify-center
  min-w-40
  w-full
  max-w-44
  h-60
  mx-auto
  m-2
  transition
  cursor-pointer
  hover:(
    transform
    scale-105	
  )
`

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  if (!isPokemonResolved(pokemon))
    return (
      <StyledCard>
        <Spinner />
      </StyledCard>
    )

  const { id, name, sprites, types } = pokemon

  return (
    <StyledCard hoverEffect>
      <div css={tw`flex-none self-end text-sm font-bold`}>#{id}</div>
      <div css={tw`flex flex-grow justify-center items-center`}>
        {sprites.front_default ? (
          <Image src={sprites.front_default} width={115} height={115} />
        ) : (
          <Spinner />
        )}
      </div>
      <div css={tw`flex-none my-2 font-bold capitalize`}>{name}</div>
      <div css={tw`flex-none flex-wrap space-x-2`}>
        {types.map(({ type: { name: typeName } }, index) => (
          <Badge
            key={index}
            backgroundColor={POKEMON_TYPE_COLOR[typeName]}
            color={POKEMON_TYPE_COLOR_CONTRAST[typeName]}
          >
            {typeName.toUpperCase()}
          </Badge>
        ))}
      </div>
    </StyledCard>
  )
}

export default memo(PokemonCard)
