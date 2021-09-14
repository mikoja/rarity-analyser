import mongoose from 'mongoose'
import { metaSchema, tokenSchema } from './schema'

export const Token = mongoose.model('Token', tokenSchema)

export const Meta = mongoose.model('Meta', metaSchema)
