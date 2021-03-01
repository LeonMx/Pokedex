import { FC } from 'react'
import tw from 'twin.macro'

export type BadgeProps = {
  pill?: boolean
  hoverEffect?: boolean
}

const Badge: FC<BadgeProps> = ({ pill, hoverEffect, ...rest }) => (
  <span
    css={[
      tw`rounded text-gray-600 bg-gray-200 px-2 py-1 text-xs font-bold mr-3`,
      pill && tw`rounded-full`,
      hoverEffect && tw`hover:opacity-75`,
    ]}
    {...rest}
  />
)

export default Badge
