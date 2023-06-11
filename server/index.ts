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
  },
  type Market {
    name: String
    base: String
    quote: String
    price: Int
    price_usd: Int
    volume: Int
    volume_usd: Int
    time: Int
  }

  type Query {
    coins: [Coin]
    market: [Market]
  }
`;

const resolvers = {
  Query: {
    coins: async () => {
      const response = await axios.get("https://api.coinlore.net/api/tickers/");
      const data = await response.data.data;
      return data;
    },
    market:async (coin_id: {id: {type: 'string'}}) => {
        const response = await axios.get(
          `https://api.coinlore.net/api/coin/markets/?id=${coin_id}`
        );
        const data = await response.data.data;
        return data;
    }
  },
};

const server = new ApolloServer({typeDefs, resolvers});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
