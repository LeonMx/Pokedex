import { getType, getTypes } from 'api/pokemon'
import { useCallback, useEffect, useState } from 'react'
import { DAMAGE } from 'utils/constants'
import { NamedAPIResource, PokemonType, Type } from 'utils/types'

type DamageByType = { [name: string]: number }

type ReturnUseDamageEffectiveness = {
  loading?: boolean
  damageFromByType: DamageByType
  damageToByType: DamageByType
}

const resolveTypesDamage = (types: Type[]): ReturnUseDamageEffectiveness =>
  types.reduce(
    (
      acum,
      {
        damage_relations: {
          double_damage_from,
          double_damage_to,
          half_damage_from,
          half_damage_to,
          no_damage_from,
          no_damage_to,
        },
      }
    ) => {
      const calculateDamage = (
        typesDamage: NamedAPIResource[],
        damage: number,
        isFrom: boolean
      ): void => {
        const damageByTypeKey = isFrom ? 'damageFromByType' : 'damageToByType'

        typesDamage.map(({ name }) => {
          acum[damageByTypeKey][name] = (acum[damageByTypeKey][name] ?? 1) * damage
        })
      }

      calculateDamage(double_damage_from, DAMAGE.DODLE, true)
      calculateDamage(double_damage_to, DAMAGE.DODLE, false)
      calculateDamage(half_damage_from, DAMAGE.HALF, true)
      calculateDamage(half_damage_to, DAMAGE.HALF, false)
      calculateDamage(no_damage_from, DAMAGE.NONE, true)
      calculateDamage(no_damage_to, DAMAGE.NONE, false)

      return acum
    },
    {
      damageFromByType: {},
      damageToByType: {},
    }
  )

const useDamageEffectiveness = (types: PokemonType[]): ReturnUseDamageEffectiveness => {
  const [loadingRequestsType, setLoadingRequestsType] = useState(false)
  const [loadingRequestTypes, setLoadingRequestTypes] = useState(false)
  const [damageFromByType, setDamageFromByType] = useState<DamageByType>({})
  const [damageToByType, setDamageToByType] = useState<DamageByType>({})

  const setDamageByType = useCallback(
    (
      { damageFromByType, damageToByType }: ReturnUseDamageEffectiveness,
      reserve?: boolean
    ): void => {
      setDamageFromByType((prevDamageFromByType) =>
        reserve
          ? {
              ...damageFromByType,
              ...prevDamageFromByType,
            }
          : {
              ...prevDamageFromByType,
              ...damageFromByType,
            }
      )

      setDamageToByType((prevDamageToByType) =>
        reserve
          ? {
              ...damageToByType,
              ...prevDamageToByType,
            }
          : {
              ...prevDamageToByType,
              ...damageToByType,
            }
      )
    },
    []
  )

  useEffect(() => {
    let stopResolvePromise = false

    const requestsType = types.map(({ type: { name } }) => getType(name))

    setLoadingRequestsType(true)

    Promise.all(requestsType).then((responseRequestsType) => {
      if (stopResolvePromise) return

      const damageByType = resolveTypesDamage(responseRequestsType)

      setLoadingRequestsType(false)
      setDamageByType(damageByType)
    })

    return () => {
      stopResolvePromise = true
      setLoadingRequestsType(false)
    }
  }, [types, setDamageByType])

  useEffect(() => {
    setLoadingRequestTypes(true)

    const normalizeDamageByType = (types: NamedAPIResource[]): void => {
      const damageByType = types?.reduce(
        (damageByType, { name }) => {
          damageByType.damageFromByType[name] = 1
          damageByType.damageToByType[name] = 1

          return damageByType
        },
        {
          damageFromByType: {},
          damageToByType: {},
        }
      )

      setDamageByType(damageByType, true)
    }

    getTypes()
      .then(({ results: allTypes }) => normalizeDamageByType(allTypes))
      .finally(() => setLoadingRequestTypes(false))
  }, [setDamageByType])

  return {
    loading: loadingRequestsType || loadingRequestTypes,
    damageFromByType,
    damageToByType,
  }
}

export default useDamageEffectiveness
