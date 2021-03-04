import { ButtonHTMLAttributes, FC } from 'react'
import tw from 'twin.macro'

type ButtonHTMLAttrs = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'disabled' | 'onClick' | 'onFocus' | 'onBlur'
>

export type ButtonProps = {
  backgroundColor?: string
  textColor?: string
} & ButtonHTMLAttrs

const Button: FC<ButtonProps> = ({
  backgroundColor = `blue-600`,
  textColor = 'white',
  ...rest
}) => (
  <button
    className={`bg-${backgroundColor} text-${textColor}`}
    css={[
      tw`
        relative
        flex
        items-center
        py-1
        px-2
        space-x-2
        rounded
        text-white
        shadow
        before:empty-content
        before:hidden
        before:absolute
        before:inset-0
        before:rounded
        before:bg-white
        before:z-0
        hover:shadow-lg
        hover:before:block
        hover:before:opacity-10
        focus:shadow-lg
        focus:outline-none
        focus:before:block
        focus:before:bg-black
        focus:before:opacity-20
        disabled:bg-gray-300
        disabled:text-gray-500
        disabled:cursor-default
        disabled:hover:shadow-none
        disabled:before:hidden
        all-child:z-10
      `,
    ]}
    {...rest}
  />
)

export default Button
