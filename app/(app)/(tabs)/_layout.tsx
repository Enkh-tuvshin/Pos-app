import { BarcodeIcon } from "@/icons/BarcodeIcon";
import { HistoryIcon } from "@/icons/HistoryIcon";
import { PackageImportIcon } from "@/icons/PackageImportIcon";
import { PackagesIcon } from "@/icons/PackagesIcon";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs
      initialRouteName="pos"
      screenOptions={{ headerShown: false, tabBarStyle: { height: 100 }, tabBarLabelStyle: { paddingHorizontal: 20, fontWeight: "bold" } }}
    >
      <Tabs.Screen name="pos" options={{ title: "Касс", tabBarIcon: ({ color }) => <BarcodeIcon color={color} /> }} />
      <Tabs.Screen name="products" options={{ title: "Бараа", tabBarIcon: ({ color }) => <PackagesIcon color={color} /> }} />
      <Tabs.Screen name="transactions" options={{ title: "Гүйлгээ", tabBarIcon: ({ color }) => <HistoryIcon color={color} /> }} />
      <Tabs.Screen name="create-product" options={{ title: "Бараа+", tabBarIcon: ({ color }) => <PackageImportIcon color={color} /> }} />
    </Tabs>
  );
};

export default TabLayout;
