import { FC } from 'react'
import tw from 'twin.macro'
import Badge from 'components/Badge'
import { POKEMON_TYPE_COLOR, POKEMON_TYPE_COLOR_CONTRAST } from 'utils/constants'

type PokemonTypeProps = {
  type: string
}

const PokemonType: FC<PokemonTypeProps> = ({ type, children }) => (
  <Badge
    css={tw`mx-1 my-0.5 uppercase`}
    backgroundColor={POKEMON_TYPE_COLOR[type]}
    color={POKEMON_TYPE_COLOR_CONTRAST[type]}
  >
    {children ?? type}
  </Badge>
)

export default PokemonType
