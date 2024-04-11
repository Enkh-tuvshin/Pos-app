import { Redirect, Stack } from "expo-router";

const StackLayout = () => {
  const isSignedIn = false;
  //   if (!isSignedIn) return <Redirect href="/login" />;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default StackLayout;
