export type NamedAPIResource = {
  name: string
  url: string
}

export type PokemonAbility = {
  is_hidden: boolean
  slot: number
  ability: NamedAPIResource
}

export type VersionGameIndex = {
  game_index: number
  version: NamedAPIResource
}

export type PokemonHeldItemVersion = {
  version: NamedAPIResource
  rarity: number
}

export type PokemonHeldItem = {
  item: NamedAPIResource
  version_details: PokemonHeldItemVersion[]
}

export type PokemonMoveVersion = {
  move_learn_method: NamedAPIResource
  version_group: NamedAPIResource
  level_learned_at: number
}

export type PokemonMove = {
  move: NamedAPIResource
  version_group_details: PokemonMoveVersion[]
}

export type PokemonSprites = {
  front_default: string
  front_shiny: string
  front_female: string
  front_shiny_female: string
  back_default: string
  back_shiny: string
  back_female: string
  back_shiny_female: string
}

export type PokemonStat = {
  stat: NamedAPIResource
  effort: number
  base_stat: number
}

export type PokemonType = {
  slot: number
  type: NamedAPIResource
}

export type Pokemon = {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: PokemonAbility[]
  forms: NamedAPIResource[]
  game_indices: VersionGameIndex[]
  held_items: PokemonHeldItem[]
  location_area_encounters: string
  moves: PokemonMove[]
  sprites: PokemonSprites
  species: NamedAPIResource[]
  stats: PokemonStat[]
  types: PokemonType[]
}

export type TypeRelations = {
  no_damage_to: NamedAPIResource[]
  half_damage_to: NamedAPIResource[]
  double_damage_to: NamedAPIResource[]
  no_damage_from: NamedAPIResource[]
  half_damage_from: NamedAPIResource[]
  double_damage_from: NamedAPIResource[]
}

export type GenerationGameIndex = {
  game_index: number
  generation: NamedAPIResource
}

export type Name = {
  name: string
  language: NamedAPIResource
}

export type TypePokemon = {
  slot: number
  type: NamedAPIResource
}

export type Type = {
  id: number
  name: string
  damage_relations: TypeRelations
  game_indices: GenerationGameIndex[]
  generation: NamedAPIResource
  move_damage_class: NamedAPIResource
  names: Name[]
  pokemon: TypePokemon[]
  moves: NamedAPIResource[]
}

// this type represent pokemon data full(Pokemon) or partial(NamedAPIResource)
export type PokemonData = Pokemon | NamedAPIResource

// When pokemon param is Pokemon type, is concidered resolved
export const isPokemonResolved = (pokemon: PokemonData): pokemon is Pokemon => {
  return (pokemon as Pokemon).id !== undefined
}
