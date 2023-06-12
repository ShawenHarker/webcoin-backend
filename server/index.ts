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
    volume24: Int
    volume24a: Int
    csupply: String
    tsupply: String
    msupply: String
  }

  type Query {
    data: [Coin]
  }
`;

const resolvers = {
  Query: {
    data: async () => {
      const response = await axios.get(process.env.URL);
      const data = await response.data.data;
      return data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: parseInt(process.env.PORT) },
});

console.log(`🚀  Server ready at: ${url}`);
