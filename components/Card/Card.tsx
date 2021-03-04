import { forwardRef, ReactNode } from 'react'
import tw from 'twin.macro'

export type CardProps = {
  hoverEffect?: boolean
  children?: ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ hoverEffect, ...rest }, ref) => (
  <div
    ref={ref}
    css={[
      tw`bg-white relative shadow p-2 rounded-lg text-gray-800`,
      hoverEffect && tw`hover:shadow-lg`,
    ]}
    {...rest}
  />
))

Card.displayName = 'Card'

export default Card
