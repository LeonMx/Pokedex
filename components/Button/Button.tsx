import { ButtonHTMLAttributes, FC } from 'react'
import tw from 'twin.macro'

type ButtonHTMLAttrs = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'disabled' | 'onClick'
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
        py-2
        px-4
        rounded-md
        text-white
        focus:outline-none
        hover:shadow-lg
        hover:bg-opacity-90
        disabled:opacity-50
        disabled:hover:shadow-none
        disabled:hover:bg-opacity-100
      `,
    ]}
    {...rest}
  />
)

export default Button
