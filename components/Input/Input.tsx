import { FC, InputHTMLAttributes } from 'react'
import tw from 'twin.macro'

type InputHTMLAttrs = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'name'
  | 'placeholder'
  | 'value'
  | 'min'
  | 'max'
  | 'autoFocus'
  | 'disabled'
  | 'onBlur'
  | 'onChange'
  | 'onClick'
  | 'onFocus'
  | 'onKeyDown'
>
export type InputProps = {
  type?: 'text' | 'password' | 'number'
} & InputHTMLAttrs

const Input: FC<InputProps> = (props) => (
  <input
    css={[
      tw`shadow appearance-none border rounded py-1 px-2 text-gray-600 focus:outline-none focus:ring focus:border-blue-300 disabled:bg-gray-300`,
    ]}
    {...props}
  />
)

export default Input
