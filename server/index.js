import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './src/schema/typeDefs.js';
import resolvers from './src/resolver/resolvers.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
}

startServer();
