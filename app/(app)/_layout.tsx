import { Redirect, Stack } from "expo-router";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const StackLayout = () => {
  const isSignedIn = false;
  //   if (!isSignedIn) return <Redirect href="/login" />;
  const client = new ApolloClient({
    uri: "https://nextjs-graphql-chi.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ApolloProvider>
  );
};

export default StackLayout;
