import { FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import tw, { theme } from 'twin.macro'
import Card from 'components/Card'
import TypeChip from 'components/TypeChip'
import { getPokemon } from 'api/pokemon'
import { Pokemon } from 'utils/types'
import { STATS } from 'utils/constants'
import DamageEffectiveness from 'components/DamageEffectiveness'
import ProgressBar from 'components/ProgressBar'

type PokemonProps = { data?: Pokemon }

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
const calculateStatPoints = (
  name: string,
  baseStat: number
): {
  baseStat: number
  percentage: number
  minPoint: number
  maxPoint: number
} => {
  /* 
    For calculate max and min stat points:
  
    Formula for hp:
    max: BaseStat x 2 + 204
    min: BaseStat x 2 + 110

    Formula for other stats:
    max: ( BaseStat x 2 + 99 ) x 1.1
    min: ( BaseStat x 2 + 5 ) x 0.9

    https://bulbapedia.bulbagarden.net/wiki/Stat#Base_stats
  */
  const minPoint = name === STATS.HP ? baseStat * 2 + 110 : (baseStat * 2 + 5) * 0.9
  const maxPoint = name === STATS.HP ? baseStat * 2 + 204 : (baseStat * 2 + 99) * 1.1
  const percentage = (baseStat / 180) * 100
  return { baseStat, percentage, minPoint, maxPoint }
}

const statColor = {
  low: theme`colors.red.500`,
  neutral: theme`colors.yellow.300`,
  high: theme`colors.green.500`,
  highest: theme`colors.blue.500`,
}

const getColorBaseStat = (baseStat: number): string => {
  if (baseStat < 50) return statColor.low

  if (baseStat < 100) return statColor.neutral

  if (baseStat < 150) return statColor.high

  return statColor.highest
}

const getUnit = (num: number): string => (num * 0.1).toFixed(2)

const PokemonDetail: NextPage<PokemonProps> = ({ data }) => {
  const { id, name, sprites, types, height, weight, abilities, stats, moves, game_indices } = data

  return (
    <>
      <div className="flex justify-center space-x-4 mb-6">
        <div className="flex-none bg-white shadow p-4">
          <Image src={sprites.front_default} width={115} height={115} />
        </div>
        <div className="flex-row space-y-3">
          <div>
            <h2 className="text-2xl font-bold text-red-400">#{id}</h2>
            <h1 className="text-3xl capitalize">{name}</h1>
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
                <>
                  <span className="capitalize">{name}</span>

                  <ProgressBar
                    key={index}
                    size="sm"
                    percentage={percentage}
                    backgroundColor={getColorBaseStat(base_stat)}
                  >
                    {base_stat}
                  </ProgressBar>
                </>
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
    props: { data: pokemon },
  }
}

export default PokemonDetail
