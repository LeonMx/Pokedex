import { FC, KeyboardEvent, ChangeEvent, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import tw from 'twin.macro'
import Input, { InputProps } from 'components/Input'
import Button, { ButtonProps } from 'components/Button'
import Spinner from 'components/Spinner'

export type SearchProps = Pick<InputProps, 'onFocus' | 'onBlur' | 'onChange'> &
  ButtonProps & {
    onSearch?: (value: string) => void
    loading?: boolean
    children?: never
  }

const Search: FC<SearchProps> = ({
  loading,
  onFocus,
  onBlur,
  onChange,
  onClick,
  onSearch,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState('')

  const triggerSearch = (): void => {
    onSearch && onSearch(inputValue)
    setInputValue('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      triggerSearch()
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.currentTarget.value)
    onChange && onChange(event)
  }

  return (
    <div {...rest}>
      <Input
        css={[tw`flex-auto min-w-0`]}
        placeholder="pokemon name or pokedex number"
        value={inputValue}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <Button
        css={tw`ml-2 bg-blue-600`}
        disabled={!inputValue || loading}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={triggerSearch}
      >
        {!loading && <MdSearch css={tw`inline`} size={24} />}
        {loading && <Spinner />}
        <span css={tw`hidden sm:inline`}>Search</span>
      </Button>
    </div>
  )
}

export default Search
