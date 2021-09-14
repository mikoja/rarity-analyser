import { ApolloServer } from 'apollo-server'
import connect from './db/connection'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import dotenv from 'dotenv'

dotenv.config()

connect()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground
  ],
})

server.listen({ port: process.env.PORT ?? 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
