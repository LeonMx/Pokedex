import { FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import tw, { styled, css } from 'twin.macro'
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

const CardsContainer = styled.div<{ vertical?: boolean }>(
  ({ vertical }) => css`
    ${tw`
      flex
      flex-wrap
      justify-center
      items-start
      mb-6
      all-child:(mx-2 my-3)
    `}
    ${vertical && tw`flex-grow flex-col items-stretch all-child:(mx-auto w-full)`}

    & > & {
      margin: 0;
    }
  `
)

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

const Field: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-row justify-center w-full space-x-2">
    <span className="flex-1 w-full text-right text-gray-500">{label}</span>
    <span className="flex-1 w-full">{value}</span>
  </div>
)

const Title = tw.div`text-2xl`
const GridCols1 = tw.ul`grid grid-flow-row grid-cols-1 md:grid-cols-1 grid-rows-1 gap-x-5 list-disc list-inside`
const GridCols3 = tw.ul`grid grid-flow-row grid-cols-2 md:grid-cols-3 grid-rows-1 gap-x-5 list-disc list-inside`

const PokemonDetailPage: NextPage<PokemonProps> = ({ pokemon }) => {
  if (!pokemon) {
    return <Title data-testid={TEST_ID_NO_FOUND}>No found pokemon</Title>
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
      <Head>
        <title>{`${name} | Pokemon`}</title>
      </Head>
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
        <CardsContainer vertical>
          <FlexCard>
            <Title>Size</Title>

            <Field label="Height" value={`${getUnit(height)} m`} />

            <Field label="Weight" value={`${getUnit(weight)} kg`} />
          </FlexCard>

          <FlexCard>
            <Title>Abilities</Title>

            <GridCols1>
              {abilities.map(({ ability: { name } }, index) => (
                <li key={index}>{name}</li>
              ))}
            </GridCols1>
          </FlexCard>
        </CardsContainer>

        <FlexCard>
          <Title>Types defenses</Title>

          <DamageEffectiveness types={types} />
        </FlexCard>

        <FlexCard css={tw`lg:min-w-80`}>
          <Title>Stats</Title>

          {stats.map(({ stat: { name }, base_stat }, index) => {
            const { percentage } = calculateStatPoints(name, base_stat)
            return (
              <div key={index} className="w-full">
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
        </FlexCard>

        <FlexCard>
          <Title>Games where appears</Title>

          <GridCols3>
            {game_indices.map(({ version: { name } }, index) => (
              <li key={index}>{name}</li>
            ))}
          </GridCols3>
        </FlexCard>

        <FlexCard>
          <Title>Moves</Title>

          <GridCols3>
            {moves.map(({ move: { name } }, index) => (
              <li key={index}>{name}</li>
            ))}
          </GridCols3>
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
