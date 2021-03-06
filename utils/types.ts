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
  version_details: Array<PokemonHeldItemVersion>
}

export type PokemonMoveVersion = {
  move_learn_method: NamedAPIResource
  version_group: NamedAPIResource
  level_learned_at: number
}

export type PokemonMove = {
  move: NamedAPIResource
  version_group_details: Array<PokemonMoveVersion>
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
  abilities: Array<PokemonAbility>
  forms: Array<NamedAPIResource>
  game_indices: Array<VersionGameIndex>
  held_items: Array<PokemonHeldItem>
  location_area_encounters: string
  moves: Array<PokemonMove>
  sprites: PokemonSprites
  species: Array<NamedAPIResource>
  stats: Array<PokemonStat>
  types: Array<PokemonType>
}

export type TypeRelations = {
  no_damage_to: Array<NamedAPIResource>
  half_damage_to: Array<NamedAPIResource>
  double_damage_to: Array<NamedAPIResource>
  no_damage_from: Array<NamedAPIResource>
  half_damage_from: Array<NamedAPIResource>
  double_damage_from: Array<NamedAPIResource>
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
  game_indices: Array<GenerationGameIndex>
  generation: NamedAPIResource
  move_damage_class: NamedAPIResource
  names: Array<Name>
  pokemon: Array<TypePokemon>
  moves: Array<NamedAPIResource>
}

// this type represent pokemon data full(Pokemon) or partial(NamedAPIResource)
export type PokemonData = Pokemon | NamedAPIResource

// When pokemon param is Pokemon type, is concidered resolved
export const isPokemonResolved = (pokemon: PokemonData): pokemon is Pokemon => {
  return (pokemon as Pokemon).id !== undefined
}
