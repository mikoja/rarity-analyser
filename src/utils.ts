import { GetIsMissing } from './types'

export const getFileName = (
  collectionName: string | undefined,
  postfix?: string
) => {
  return (
    (collectionName ?? 'collection').split(' ').join('') +
    (postfix ?? '') +
    '.json'
  )
}

/**
 * @param traitType
 * @param token
 * @param missingTraitIdentifier  Value of the trait type that indicates that it is missing. `undefined` (default) if there is no specific identifier and the {trait_type: string, value: string} entry is simply omitted.
 * @returns true if the attribute is not found or if the value of the attribute is equal to the missingTraitIdentifier
 */
export const getIsMissing: GetIsMissing =
  (missingTraitIdentifierFn) => (traitType, token) => {
    const attribute = token.attributes.find(
      (att) => att.trait_type === traitType
    )
    return !attribute || attribute.value === missingTraitIdentifierFn(traitType)
  }

export const defaultMissingTraitIdentifier = () => undefined
