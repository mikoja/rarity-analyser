import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connect = (uri?: string) => {
  const s = uri ?? process.env.MONGODB
  if (!s) throw new Error('Connection URI not found')
  mongoose.connect(s)
}

export default connect
