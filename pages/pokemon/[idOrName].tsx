import { FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import tw from 'twin.macro'
import Card from 'components/Card'
import TypeChip from 'components/TypeChip'
import { getPokemon } from 'api/pokemon'
import { Pokemon } from 'utils/types'
import DamageEffectiveness from 'components/DamageEffectiveness'
import ProgressBar from 'components/ProgressBar'
import { calculateStatPoints, getColorBaseStat, getUnit } from 'utils/utils'

export const TEST_ID_NAME_POKEMON = 'pokemon_name'
export const TEST_ID_NO_FOUND = 'no_found_pokemon'

type PokemonProps = { pokemon?: Pokemon }

const CardsContainer = tw.div`
  flex
  flex-wrap
  justify-center
  items-start
  mb-6
  all-child:m-4
`

const FlexCard = tw(Card)`
  flex
  flex-col
  flex-grow
  items-center
  min-w-60
  max-w-lg
  px-6
  py-4
  space-y-2
`
const Title = tw.div`text-2xl`

const ItemsGrid: FC<{ items: string[]; cols?: number; maxCols?: number }> = ({
  items,
  cols = 2,
  maxCols = 3,
}) => (
  <ul
    className={`grid grid-flow-row grid-cols-${cols} md:grid-cols-${maxCols} grid-rows-1 gap-x-5 list-disc list-inside`}
  >
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
)

const PokemonDetailPage: NextPage<PokemonProps> = ({ pokemon }) => {
  if (!pokemon) {
    return (
      <h1 data-testid={TEST_ID_NO_FOUND} className="text-lg font-bold">
        No found pokemon
      </h1>
    )
  }

  const {
    id,
    name,
    sprites,
    types,
    height,
    weight,
    abilities,
    stats,
    moves,
    game_indices,
  } = pokemon

  return (
    <>
      <div className="flex justify-center space-x-4 mb-6">
        <div className="flex-none bg-white shadow p-4">
          <Image src={sprites.front_default} width={115} height={115} />
        </div>
        <div className="flex-row space-y-3">
          <div>
            <h2 className="text-2xl font-bold text-red-400">#{id}</h2>
            <h1 className="text-3xl capitalize" data-testid={TEST_ID_NAME_POKEMON}>
              {name}
            </h1>
          </div>

          <div className="flex-none flex-wrap">
            {types.map(({ type: { name } }, index) => (
              <TypeChip key={index} type={name} />
            ))}
          </div>
        </div>
      </div>

      <CardsContainer>
        <CardsContainer css={tw`flex-grow items-stretch flex-col m-0`}>
          <FlexCard css={tw`mx-auto w-full`}>
            <Title>Size</Title>

            <div className="flex flex-row justify-center w-full space-x-2">
              <span className="flex-1 w-full text-right text-gray-500">Height:</span>
              <span className="flex-1 w-full">{getUnit(height)} m</span>
            </div>

            <div className="flex flex-row justify-center w-full space-x-2">
              <span className="flex-1 w-full text-right text-gray-500">Weight:</span>
              <span className="flex-1 w-full">{getUnit(weight)} kg</span>
            </div>
          </FlexCard>

          <FlexCard css={tw`mx-auto w-full`}>
            <Title>Abilities</Title>

            <ItemsGrid
              cols={1}
              maxCols={1}
              items={abilities.map(({ ability: { name } }) => name)}
            />
          </FlexCard>
        </CardsContainer>

        <FlexCard>
          <Title>Types defenses</Title>

          <p>
            The effectiveness of each type on <span className="capitalize">{name}</span>.
          </p>
          <DamageEffectiveness types={types} />
        </FlexCard>

        <FlexCard>
          <Title>Stats</Title>

          <div css={tw`w-full`}>
            {stats.map(({ stat: { name }, base_stat }, index) => {
              const { percentage } = calculateStatPoints(name, base_stat)
              return (
                <div key={index}>
                  <span className="capitalize">{name}</span>

                  <ProgressBar
                    key={index}
                    size="sm"
                    percentage={percentage}
                    backgroundColor={getColorBaseStat(base_stat)}
                  >
                    {base_stat}
                  </ProgressBar>
                </div>
              )
            })}
          </div>
        </FlexCard>

        <FlexCard css={tw`mx-auto w-full`}>
          <Title>Games where appears</Title>

          <ItemsGrid items={game_indices.map(({ version: { name } }) => name)} />
        </FlexCard>

        <FlexCard css={tw`mx-auto w-full`}>
          <Title>Moves</Title>

          <ItemsGrid items={moves.map(({ move: { name } }) => name)} />
        </FlexCard>
      </CardsContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PokemonProps> = async ({
  params: { idOrName },
}) => {
  const pokemon = await getPokemon(idOrName as string).catch(() => undefined)

  if (!pokemon) {
    return {
      props: {
        error: {
          statusCode: 404,
          message: 'Not found',
        },
      },
    }
  }

  return {
    props: { pokemon },
  }
}

export default PokemonDetailPage
