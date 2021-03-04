import { FC } from 'react'
import tw from 'twin.macro'

export type BadgeProps = {
  pill?: boolean
  hoverEffect?: boolean
  backgroundColor?: string
  textColor?: string
}

const Badge: FC<BadgeProps> = ({
  pill,
  hoverEffect,
  backgroundColor = 'gray-200',
  textColor = 'gray-600',
  ...rest
}) => (
  <span
    className={`bg-${backgroundColor} text-${textColor}`}
    css={[
      tw`rounded px-2 py-0.5 text-xs font-bold`,
      pill && tw`rounded-full`,
      hoverEffect && tw`hover:opacity-75`,
    ]}
    {...rest}
  />
)

export default Badge
