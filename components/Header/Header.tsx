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
    css={[tw`flex items-center justify-between flex-wrap p-4`]}
    {...props}
  />
)

export default Header
