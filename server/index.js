const express =require('express');
const app = express();
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server-express');
const port = 4000;
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

app.use(cors())
    
async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app, path: '/' });

  await new Promise(resolve => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers);