import mongoose from 'mongoose'
import {
  AttributeWithRarity,
  Meta,
  Stats,
  TokenWithRarity,
  TraitsMeta,
} from '../types'

const { Schema } = mongoose

const attributeSchema = new Schema<AttributeWithRarity>({
  trait_type: {
    type: String,
    required: true,
    index: true,
  },
  value: {
    type: String,
    required: true,
    index: true,
  },
  rarity_score: {
    type: Number,
    required: true,
    index: true,
  },
  rarity_score_normalized: {
    type: Number,
    required: true,
    index: true,
  },
  percentile: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
})

export const tokenSchema = new Schema<TokenWithRarity>({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: String,
  attributes: [attributeSchema],
  description: String,
  image: String,
  image_data: String,
  external_url: String,
  animation_url: String,
  background_color: String,
  rank: {
    type: Number,
    index: true,
  },
  rarity_score: {
    type: Number,
    index: true,
  },
  rarity_score_normalized: {
    type: Number,
    index: true,
  },
  rank_normalized: {
    type: Number,
    index: true,
  },
})

const statsSchema = new Schema<Stats>({
  mean: {
    type: Number,
    required: true,
  },
  std: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
})

const traitTypeMetaSchema = new Schema<TraitsMeta>({
  trait_type: {
    type: String,
    required: true,
  },
  attributes: {
    type: [attributeSchema],
    required: true,
  },
  stats: statsSchema,
  numValues: {
    type: Number,
    required: true,
  },
})

export const metaSchema = new Schema<Meta>({
  numTokens: {
    type: Number,
    required: true,
  },
  traitTypes: {
    type: [traitTypeMetaSchema],
    required: true,
  },
  stats: statsSchema,
})
