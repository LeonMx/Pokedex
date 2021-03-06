import { render, cleanup, screen } from '@testing-library/react'
import PokemonDetail, { TEST_ID_NAME_POKEMON, TEST_ID_NO_FOUND } from 'pages/pokemon/[idOrName]'
import { getPokemon } from 'api/pokemon'
import { Pokemon } from 'utils/types'
import { mockConsoleMethod } from 'utils/utils'

afterEach(cleanup)

console.warn = jest.fn(mockConsoleMethod(console.warn))
console.error = jest.fn(mockConsoleMethod(console.error))

const resolvePokemon = (idOrName: string | number): Promise<Pokemon> =>
  getPokemon(idOrName).catch(() => undefined)

describe('Pokemon', () => {
  it('Found pokemon', async () => {
    const pokemon = await resolvePokemon('1')
    const { asFragment } = render(<PokemonDetail pokemon={pokemon} />)
    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByTestId(TEST_ID_NAME_POKEMON)).toHaveTextContent(pokemon.name)
  })

  it('No found pokemon', async () => {
    const pokemon = await resolvePokemon('test')
    render(<PokemonDetail pokemon={pokemon} />)
    expect(screen.getAllByTestId(TEST_ID_NO_FOUND)).toHaveLength(1)
  })
})
