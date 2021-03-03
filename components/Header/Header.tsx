import { FC } from 'react'
import tw from 'twin.macro'

export type HeaderProps = {
  backgroundColor?: string
  textColor?: string
}

const Header: FC<HeaderProps> = ({
  backgroundColor = 'blue-600',
  textColor = 'white',
  ...props
}) => (
  <nav
    className={`bg-${backgroundColor} text-${textColor}`}
    css={[tw`sticky top-0 shadow flex items-center justify-between h-14 px-2 z-50`]}
    {...props}
  />
)

export default Header
