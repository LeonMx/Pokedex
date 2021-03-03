import { FC } from 'react'
import { MdSearch } from 'react-icons/md'
import tw from 'twin.macro'
import Input, { InputProps } from 'components/Input'
import Button, { ButtonProps } from 'components/Button'
import Spinner from 'components/Spinner'

export type SearchProps = Pick<InputProps, 'onFocus' | 'onBlur' | 'onChange'> &
  ButtonProps & {
    loading?: boolean
    children?: never
  }

const Search: FC<SearchProps> = ({ loading, onFocus, onBlur, onChange, onClick, ...rest }) => (
  <div {...rest}>
    <Input
      css={[tw`flex-auto min-w-0`]}
      placeholder="pokemon name or pokedex number"
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    />

    <Button
      css={tw`ml-2 bg-blue-600`}
      disabled={loading}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
    >
      {!loading && <MdSearch css={tw`inline`} size={24} />}
      {loading && <Spinner />}
      <span css={tw`hidden sm:inline`}>Search</span>
    </Button>
  </div>
)

export default Search
