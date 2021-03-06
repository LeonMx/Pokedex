import { FC } from 'react'
import tw, { css, theme } from 'twin.macro'

export type HeaderProps = {
  backgroundColor?: string
  color?: string
}

const backgroundColorDefault = theme`colors.blue.600`
const colorDefault = theme`colors.white`

const Header: FC<HeaderProps> = ({
  backgroundColor = backgroundColorDefault,
  color = colorDefault,
  ...props
}) => (
  <nav
    css={[
      tw`sticky top-0 shadow flex items-center justify-between h-14 px-2 z-50`,
      css({ backgroundColor, color }),
    ]}
    {...props}
  />
)

export default Header
