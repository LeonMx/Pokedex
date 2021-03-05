import { FC } from 'react'
import tw, { theme, css } from 'twin.macro'

export type BadgeProps = {
  pill?: boolean
  hoverEffect?: boolean
  backgroundColor?: string
  color?: string
}

const Badge: FC<BadgeProps> = ({
  pill,
  hoverEffect,
  backgroundColor = theme`colors.gray.200`,
  color = theme`colors.gray.600`,
  ...rest
}) => (
  <span
    css={[
      tw`rounded px-2 py-0.5 text-xs font-bold`,
      pill && tw`rounded-full`,
      hoverEffect && tw`hover:opacity-75`,
      css({ backgroundColor, color }),
    ]}
    {...rest}
  />
)

export default Badge
