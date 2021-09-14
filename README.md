# Rarity analyser

Creates rarity data for an NFT collection and provides a GraphQL API for making queries.

Creates both classic and normalized rarity scores.

User interface at [rarity-interface](https://github.com/mikko-o/rarity-interface).

## Getting started
### Create a MongoDB instance

1. Create a free [MongoDB Atlas instance](https://www.mongodb.com/) or use a [local MongoDB](https://docs.mongodb.com/manual/administration/install-community/).

2. Add the [connection string](https://docs.mongodb.com/manual/reference/connection-string/) for MongoDB into a .env file:

```
# .env
MONGODB=mongodb://localhost:27017/rarity
```

### Analyse metadata

Analyse collection [metadata](https://docs.opensea.io/docs/metadata-standards) with
`yarn analyse --json <path_to_metadata_json_file>`. 

### Start the GraphQL server
Start the server with `yarn dev`

### Deployment
#### Heroku
```
heroku create
heroku config:set MONGODB=mongodb+srv://<user>:<password>@db.b5lu1.mongodb.net/db
git push heroku main
```
## Configuration
Following options can be applied in the rarityConfig.ts file.
### weights
Add weights to scale rarity scores up or down.

```typescript
# rarityConfig.ts
{
  weights: {
    "Trait A": 1.2,
    "Trait B": 0,
  }
}
```

### getMissingTraitIdentifier
`(trait_type?: string) => string | undefined`

By default it is assumed that the missing traits are completely missing from the attribute list. Some collections however use other values for missing traits, for example "No Hat" for the trait type "Hat".

Example:
```typescript
# rarityConfig.ts
{
  getMissingTraitIdentifier: (traittype?: string) => "No " + traitType
}
```

### attributesFieldName

The default name is `attributes`, define a custom name here.

## API

### analyse
`yarn analyse --json <collection.json> --saveJson --db <true>`
Analyses rarity data form existing metadata

Cli options:

#### --json
Default: `src/data/collection.json`
Path to the token attribute file

#### --saveJson
Default: `false`
Saves rarity data into a json file

#### --db
Default: `true`
Skips saving to database if false

### Interfaces

##### Token

```typescript
interface Token {
  id: number
  name: string
  attributes: Attribute[] // Attribute field name can be configured in rarityConfig.ts
  image?: string
  description?: string
  image_data?: string
  external_url?: string
  animation_url?: string
  background_color?: string

  // The following fields are included in the analysed data
  rarity_score: number
  rank: number
  rarity_score_normalized: number
  rank_normalized: number
}
```

##### Attribute

```typescript
interface Attribute {
  trait_type: number
  value: string

  // The following fields are included in the analysed data
  rarity_score: number
  rarity_score_normalized: number
  percentile: number
  count: number // Count of how many tokens have the value of this attribute
}
```
