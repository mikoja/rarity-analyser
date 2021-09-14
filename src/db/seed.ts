import mongoose from 'mongoose'
import { Token, Meta } from './models'
import { Collection } from '../types'
import connect from './connection'

const seed = async (collection: Collection) => {
  connect()

  await Promise.all([Token.deleteMany({}), Meta.deleteMany({})])

  const { tokens, ...metadata } = collection

  await Promise.all([
    Token.insertMany(tokens).catch(console.error),
    Meta.create(metadata),
  ])

  mongoose.disconnect()
}

export default seed
