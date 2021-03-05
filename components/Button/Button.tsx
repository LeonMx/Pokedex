import { ButtonHTMLAttributes, FC } from 'react'
import tw, { css, theme } from 'twin.macro'

type ButtonHTMLAttrs = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'disabled' | 'onClick' | 'onFocus' | 'onBlur'
>

export type ButtonProps = {
  backgroundColor?: string
  color?: string
} & ButtonHTMLAttrs

const Button: FC<ButtonProps> = ({
  backgroundColor = theme`colors.blue.600`,
  color = theme`colors.white`,
  ...rest
}) => (
  <button
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
        before:(
          empty-content
          hidden
          absolute
          inset-0
          rounded
          bg-white
          z-0
        )
        hover:(
          shadow-lg
          before:(
            block
            opacity-10
          )
        )
        focus:(
          shadow-lg
          outline-none
          before:(
            block
            bg-black
            opacity-20
          )
        )
        disabled:(
          bg-gray-300
          text-gray-500
          cursor-default
          hover:shadow-none
          before:hidden
        )
        all-child:z-10
      `,
      css({ backgroundColor, color }),
    ]}
    {...rest}
  />
)

export default Button
