import { formatCurrency } from "@/utils/formatCurrency";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Colors, LoaderScreen, Text, TouchableOpacity, View } from "react-native-ui-lib";

const GET_PRODUCTS = gql`
  query GetProducts($query: String, $offset: Int, $limit: Int) {
    getProducts(query: $query, offset: $offset, limit: $limit) {
      id
      name
      imageUrl
      barcode
      remaining
      price
    }
  }
`;
const App = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  if (loading || !data) return <LoaderScreen />;
  if (error) <LoaderScreen message={error.message} color={Colors.grey40} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, gap: 10 }}>
        {data.getProducts.map((product: any) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => {
              router.push({ pathname: `/product-detail`, params: { productId: product.id } });
            }}
          >
            <View flex row centerV style={{ padding: 20, gap: 10, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,.1)" }}>
              <View flex row centerV>
                <Avatar
                  source={{
                    uri: product.imageUrl,
                  }}
                />
                <View>
                  <Text text80BO>{product.name}</Text>
                  <Text text100T>
                    <Text text100R>{product.remaining}</Text> үлдсэн
                  </Text>
                </View>
              </View>
              <View>
                <Text text80BO>{formatCurrency(product.price)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
