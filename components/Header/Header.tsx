import { FC } from 'react'
import tw, { css, theme } from 'twin.macro'

export type HeaderProps = {
  backgroundColor?: string
  color?: string
}

const Header: FC<HeaderProps> = ({
  backgroundColor = theme`colors.blue.600`,
  color = theme`colors.white`,
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
