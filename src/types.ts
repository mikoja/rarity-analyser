export interface Meta {
  numTokens: number
  traitTypes: TraitsMeta[]
  stats: Stats
}

export interface TraitsMeta {
  trait_type: string
  attributes: Attribute[]
  stats: Stats
  numValues: number
}

export interface Stats {
  max: number
  min: number
  mean: number
  std: number
}

export interface Collection extends Meta {
  tokens: TokenWithRarity[]
}

export type Token = {
  id: number
  name: string
  image?: string
  image_data?: string
  description?: string
  attributes: Attribute[]
  external_url?: string
  animation_url?: string
  background_color?: string
}

export interface Attribute {
  trait_type: string
  value: string
  rarity_score: number
  rarity_score_normalized?: number
  percentile: number
  count: number
}

export interface RarityFields {
  rarity_score?: number
  percentile?: number
  count?: number
}

export interface MissingTrait {
  trait_type: string
  rarity_score: number
  percentile: number
}

export interface TokenWithRarity extends Token {
  rank: number
  rarity_score: number
  rarity_score_normalized: number
  rank_normalized: number
}

export type GetMissingTraitIdentifier = (
  traitType?: string
) => string | undefined

export type Weights = { [traitType: string]: number }

export interface Config {
  weights?: Weights
  getMissingTraitIdentifier?: GetMissingTraitIdentifier
  attributesFieldName?: string
  ignoreTraits?: string[]
}

export type AttributeWithRarity = Attribute & RarityFields

export type IsMissing = <T extends Token = Token>(
  trait_type: string,
  token: T
) => boolean

export type GetIsMissing = (
  getMissingTraitIdentifier: GetMissingTraitIdentifier
) => IsMissing
