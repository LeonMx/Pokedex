import { FC, useMemo } from 'react'
import tw from 'twin.macro'
import TypeChip from 'components/TypeChip'
import Spinner from 'components/Spinner'
import Badge from 'components/Badge'
import useDamageEffectiveness from 'hooks/useDamageEffectiveness'
import { DAMAGE } from 'utils/constants'
import { PokemonType } from 'utils/types'

type DamageEffectivenessProps = {
  types: PokemonType[]
}
type TypeDamage = { typeName: string; damage: number }

const ANY_TYPE = <Badge>None</Badge>

const filterTypesByDamageLevel = (typesDamage: TypeDamage[], damages: number[]): TypeDamage[] =>
  typesDamage.filter(({ damage }) => damages.includes(damage))

const TypesDamageWrapper = tw.div`flex flex-col space-y-2`
const TypesDamage = tw.div`flex flex-row flex-wrap items-center`

const DamageEffectiveness: FC<DamageEffectivenessProps> = ({ types }) => {
  const { loading, damageFromByType } = useDamageEffectiveness(types)

  const { weakToTypes, damagedNormallyByTypes, resistantToTypes, immuneToTypes } = useMemo(() => {
    const typesDamage = Object.entries(damageFromByType).map(([typeName, damage]) => ({
      typeName,
      damage,
    }))

    return {
      weakToTypes: filterTypesByDamageLevel(typesDamage, [DAMAGE.DODLE]),
      damagedNormallyByTypes: filterTypesByDamageLevel(typesDamage, [DAMAGE.NORMAL]),
      resistantToTypes: filterTypesByDamageLevel(typesDamage, [DAMAGE.HALF, DAMAGE.QUARTER]),
      immuneToTypes: filterTypesByDamageLevel(typesDamage, [DAMAGE.NONE]),
    }
  }, [damageFromByType])

  if (loading) return <Spinner />

  return (
    <TypesDamageWrapper>
      <h3 className="font-bold">Weak to:</h3>
      <TypesDamage>
        {!weakToTypes.length && ANY_TYPE}
        {weakToTypes.map(({ typeName }, index) => (
          <TypeChip key={index} type={typeName} />
        ))}
      </TypesDamage>
      <h3 className="font-bold">Damaged normally by:</h3>
      <TypesDamage>
        {!damagedNormallyByTypes.length && ANY_TYPE}
        {damagedNormallyByTypes.map(({ typeName }, index) => (
          <TypeChip key={index} type={typeName} />
        ))}
      </TypesDamage>
      <h3 className="font-bold">Resistant by:</h3>
      <TypesDamage>
        {!resistantToTypes.length && ANY_TYPE}
        {resistantToTypes.map(({ typeName }, index) => (
          <TypeChip key={index} type={typeName} />
        ))}
      </TypesDamage>
      <h3 className="font-bold">Inmune to:</h3>
      <TypesDamage>
        {!immuneToTypes.length && ANY_TYPE}
        {immuneToTypes.map(({ typeName }, index) => (
          <TypeChip key={index} type={typeName} />
        ))}
      </TypesDamage>
    </TypesDamageWrapper>
  )
}

export default DamageEffectiveness
