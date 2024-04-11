import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="product-detail" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default StackLayout;
