import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Slot } from "expo-router";
import { Typography, Colors, Spacings } from "react-native-ui-lib";

Colors.loadColors({
  pink: "#FF69B4",
  gold: "#FFD700",
});

Typography.loadTypographies({
  h1: { fontSize: 58, fontWeight: "300", lineHeight: 80 },
  h2: { fontSize: 46, fontWeight: "300", lineHeight: 64 },
});

Spacings.loadSpacings({
  page: 16,
});
const client = new ApolloClient({
  // uri: "https://nextjs-graphql-chi.vercel.app/api/graphql",
  uri: "http://192.168.1.9:3000/api/graphql",
  cache: new InMemoryCache(),
});

const RootLayout = () => (
  <ApolloProvider client={client}>
    <Slot />
  </ApolloProvider>
);

export default RootLayout;
