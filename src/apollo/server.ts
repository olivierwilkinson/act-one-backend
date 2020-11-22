import { ApolloServer } from 'apollo-server-express';

import schema from '../schema';
import { createContext } from './context';

export default new ApolloServer({
  schema,
  context: createContext,
});
