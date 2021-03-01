import { FC } from 'react'
import tw from 'twin.macro'

export type CardProps = {
  hoverEffect?: boolean
}

const Card: FC<CardProps> = ({ hoverEffect, ...rest }) => (
  <div
    css={[
      tw`bg-white relative shadow p-2 rounded-lg text-gray-800`,
      hoverEffect && tw`hover:shadow-lg`,
    ]}
    {...rest}
  />
)

export default Card
