import { gql } from 'apollo-server-core'

const typeDefs = gql`
  type Attribute {
    id: Int!
    trait_type: String!
    value: String
    rarity_score: Float!
    rarity_score_normalized: Float!
    percentile: Float!
    count: Float!
    tokenId: Int!
  }
  type TraitCount {
    count: Int!
    percentile: Float!
    rarity_score: Float!
    tokenId: Int!
  }
  type Token {
    id: Int!
    name: String!
    attributes: [Attribute!]!
    metadataUrl: String!
    trait_count: TraitCount!
    description: String
    image: String
    image_data: String
    external_url: String
    animation_url: String
    background_color: String
    rank: Float!
    rarity_score: Float!
    rarity_score_normalized: Float!
    rank_normalized: Float!
  }
  type AttributeMeta {
    trait_type: String!
    rarity_score: Float!
    rarity_score_normalized: Float!
    value: String
    percentile: Float!
    count: Float!
  }
  type Stats {
    mean: Float!
    std: Float!
    min: Float!
    max: Float!
  }
  type TraitTypeMeta {
    trait_type: String!
    attributes: [AttributeMeta!]!
    stats: Stats!
    numValues: Int!
  }
  type Meta {
    numTokens: Int!
    traitTypes: [TraitTypeMeta!]!
    stats: Stats!
  }

  input Trait {
    trait_type: String
    value: String
  }

  type Query {
    tokens(
      first: Int
      skip: Int
      orderBy: String
      orderDirection: String
      traits: [Trait]
      id: Int
    ): [Token]
    token(id: Int, rank: Int): Token
    meta: Meta
  }
`

export default typeDefs
