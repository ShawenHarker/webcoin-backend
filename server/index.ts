import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";
import "dotenv/config";

const typeDefs = `#graphql
  type Coin {
    id: String
    nameid: String
    symbol: String
    name: String
    rank: Int
    price_usd: String
    percent_change_1h: String
    percent_change_24h: String
    percent_change_7d: String
    price_btc: String
    market_cap_usd: String
    volume24: Float
    volume24a: Float
    csupply: String
    tsupply: String
    msupply: String
  }

  type Query {    coin: [Coin]
  }
`;

// The resolvers function is getting the data from the Coinlore API.
const resolvers = {
  Query: {
    coin: async () => {
      const {
        data: { data }
      } = await axios.get(process.env.URL);
      return data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: parseInt(process.env.PORT) },
});

console.log(`🚀  Server ready at: ${url}`);
