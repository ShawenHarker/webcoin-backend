import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";

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
  }

  type Query {
    data: [Coin]
  }
`;

const resolvers = {
  Query: {
    data: async () => {
      const response = await axios.get("https://api.coinlore.net/api/tickers/");
      const data = await response.data.data;
      return data;
    },
  },
};

const server = new ApolloServer({typeDefs, resolvers});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
