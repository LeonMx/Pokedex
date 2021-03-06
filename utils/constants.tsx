import { theme } from 'twin.macro'

export const POKEMON_TYPE = {
  NORMAL: 'normal',
  FIGHTING: 'fighting',
  FLYING: 'flying',
  POISON: 'poison',
  GROUND: 'ground',
  ROCK: 'rock',
  BUG: 'bug',
  GHOST: 'ghost',
  STEEL: 'steel',
  FIRE: 'fire',
  WATER: 'water',
  GRASS: 'grass',
  ELECTRIC: 'electric',
  PSYCHIC: 'psychic',
  ICE: 'ice',
  DRAGON: 'dragon',
  DARK: 'dark',
  FAIRY: 'fairy',
  UNKNOWN: 'unknown',
  SHADOW: 'shadow',
}

export const POKEMON_TYPE_COLOR = {
  [POKEMON_TYPE.NORMAL]: theme`colors.type-normal.DEFAULT`,
  [POKEMON_TYPE.FIGHTING]: theme`colors.type-fighting.DEFAULT`,
  [POKEMON_TYPE.FLYING]: theme`colors.type-flying.DEFAULT`,
  [POKEMON_TYPE.POISON]: theme`colors.type-poison.DEFAULT`,
  [POKEMON_TYPE.GROUND]: theme`colors.type-ground.DEFAULT`,
  [POKEMON_TYPE.ROCK]: theme`colors.type-rock.DEFAULT`,
  [POKEMON_TYPE.BUG]: theme`colors.type-bug.DEFAULT`,
  [POKEMON_TYPE.GHOST]: theme`colors.type-ghost.DEFAULT`,
  [POKEMON_TYPE.STEEL]: theme`colors.type-steel.DEFAULT`,
  [POKEMON_TYPE.FIRE]: theme`colors.type-fire.DEFAULT`,
  [POKEMON_TYPE.WATER]: theme`colors.type-water.DEFAULT`,
  [POKEMON_TYPE.GRASS]: theme`colors.type-grass.DEFAULT`,
  [POKEMON_TYPE.ELECTRIC]: theme`colors.type-electric.DEFAULT`,
  [POKEMON_TYPE.PSYCHIC]: theme`colors.type-psychic.DEFAULT`,
  [POKEMON_TYPE.ICE]: theme`colors.type-ice.DEFAULT`,
  [POKEMON_TYPE.DRAGON]: theme`colors.type-dragon.DEFAULT`,
  [POKEMON_TYPE.DARK]: theme`colors.type-dark.DEFAULT`,
  [POKEMON_TYPE.FAIRY]: theme`colors.type-fairy.DEFAULT`,
  [POKEMON_TYPE.UNKNOWN]: theme`colors.type-unknown.DEFAULT`,
  [POKEMON_TYPE.SHADOW]: theme`colors.type-shadow.DEFAULT`,
}

export const POKEMON_TYPE_COLOR_CONTRAST = {
  [POKEMON_TYPE.NORMAL]: theme`colors.type-normal.contrast`,
  [POKEMON_TYPE.FIGHTING]: theme`colors.type-fighting.contrast`,
  [POKEMON_TYPE.FLYING]: theme`colors.type-flying.contrast`,
  [POKEMON_TYPE.POISON]: theme`colors.type-poison.contrast`,
  [POKEMON_TYPE.GROUND]: theme`colors.type-ground.contrast`,
  [POKEMON_TYPE.ROCK]: theme`colors.type-rock.contrast`,
  [POKEMON_TYPE.BUG]: theme`colors.type-bug.contrast`,
  [POKEMON_TYPE.GHOST]: theme`colors.type-ghost.contrast`,
  [POKEMON_TYPE.STEEL]: theme`colors.type-steel.contrast`,
  [POKEMON_TYPE.FIRE]: theme`colors.type-fire.contrast`,
  [POKEMON_TYPE.WATER]: theme`colors.type-water.contrast`,
  [POKEMON_TYPE.GRASS]: theme`colors.type-grass.contrast`,
  [POKEMON_TYPE.ELECTRIC]: theme`colors.type-electric.contrast`,
  [POKEMON_TYPE.PSYCHIC]: theme`colors.type-psychic.contrast`,
  [POKEMON_TYPE.ICE]: theme`colors.type-ice.contrast`,
  [POKEMON_TYPE.DRAGON]: theme`colors.type-dragon.contrast`,
  [POKEMON_TYPE.DARK]: theme`colors.type-dark.contrast`,
  [POKEMON_TYPE.FAIRY]: theme`colors.type-fairy.contrast`,
  [POKEMON_TYPE.UNKNOWN]: theme`colors.type-unknown.contrast`,
  [POKEMON_TYPE.SHADOW]: theme`colors.type-shadow.contrast`,
}

export const STATS = {
  HP: 'hp',
  ATTACK: 'attack',
  DEFENSE: 'defence',
  SPECIAL_ATTACK: 'special-attack',
  SPECIAL_DEFENCE: 'special-defence',
  SPEED: 'speed',
}

export const DAMAGE = {
  DODLE: 2,
  NORMAL: 1,
  HALF: 0.5,
  QUARTER: 0.25,
  NONE: 0,
}

export const DAMAGE_EFFECTIVENESS = {
  double_damage_from: 2,
  double_damage_to: 2,
  half_damage_from: 0.5,
  half_damage_to: 0.5,
  no_damage_from: 0,
  no_damage_to: 0,
}
