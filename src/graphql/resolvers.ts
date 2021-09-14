import { Token, Meta } from '../db/models'

interface TokensArgs {
  first: number
  skip: number
  orderBy: string
  orderDirection: string
  trait_count: number
  traits: Array<{
    trait_type: string
    value: string
  }>
  id: number
}

const resolvers = {
  Query: {
    tokens(parent: any, args: TokensArgs) {
      const { first, skip, orderBy, orderDirection, traits, id } = args

      const [trait_types, values] = traits
        ? traits.reduce(
          ([trait_types, values], trait) => [
            [...trait_types, trait.trait_type],
            [...values, trait.value],
          ],
          [[] as string[], [] as string[]]
        )
        : []

      return Token.find({
        ...(id ? { id } : {}),
        ...(traits
          ? {
            'attributes.trait_type': { $in: trait_types },
            'attributes.value': { $in: values },
          }
          : {}),
      })
        .sort({ [orderBy ?? 'rarity_score']: orderDirection ?? 'desc' })
        .skip(skip)
        .limit(first)
        .catch(console.log)
    },
    token(parent: any, args: { id?: number; rank?: number }) {
      const { id, rank } = args
      return Token.findOne({
        ...(rank ? { rank } : {}),
        ...(id ? { id } : {}),
      }).catch(console.log)
    },
    meta: () => Meta.findOne({}).catch(console.log),
  },
}

export default resolvers
