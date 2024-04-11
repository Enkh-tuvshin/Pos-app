import { gql, useQuery } from "@apollo/client";
import { useGlobalSearchParams } from "expo-router";
import { Avatar, Colors, LoaderScreen, Text, View } from "react-native-ui-lib";

const GET_PRODUCT_BY_ID = gql`
  query Query($id: ID!) {
    getProductById(id: $id) {
      id
      name
      imageUrl
      barcode
      remaining
      price
    }
  }
`;

const ProductDetail = () => {
  const { productId } = useGlobalSearchParams();
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, { variables: { id: productId } });
  if (loading || !data) return <LoaderScreen />;
  if (error) return <LoaderScreen color={Colors.grey40} message={error.message} />;
  const { getProductById: product } = data;
  return (
    <View padding={20} center gap={40}>
      <Text text60BO center>
        {product.name}
      </Text>
      <Avatar source={{ uri: product.imageUrl }} size={150} />
    </View>
  );
};
export default ProductDetail;
