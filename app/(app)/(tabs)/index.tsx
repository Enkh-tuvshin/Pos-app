"use client";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TextField } from "react-native-ui-lib";
import { gql, useMutation } from "@apollo/client";

type Input = {
  eventCount: number;
  text: string;
};

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductCreateInput!) {
    createProduct(input: $input) {
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
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [barcode, setBarCode] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productname, setProductname] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [scaning, setScaning] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    setScaning(false);
    setBarCode(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>{price?.text}</Text>
      <TextField
        style={{
          borderWidth: 1,
          paddingHorizontal: 10,
          height: 40,
          justifyContent: "center",
        }}
        placeholder={"Product name"}
        enableErrors
        validate={["required"]}
        validationMessage={["Field is required"]}
        showCharCounter
        maxLength={100}
        onChange={setProductname}
      />
      <TextField
        style={{
          borderWidth: 1,
          paddingHorizontal: 10,
          height: 40,
          justifyContent: "center",
        }}
        placeholder={"Price"}
        enableErrors
        keyboardType={"numeric"}
        validate={["required", "number"]}
        validationMessage={["Field is required", "only number"]}
        showCharCounter
        maxLength={100}
        onChange={setPrice}
      />
      <TextField
        style={{
          borderWidth: 1,
          paddingHorizontal: 10,
          height: 40,
          justifyContent: "center",
        }}
        placeholder={"Remaining"}
        enableErrors
        keyboardType={"numeric"}
        validate={["required"]}
        validationMessage={["Field is required", "number!!!"]}
        showCharCounter
        maxLength={100}
      />
      <TextField
        style={{
          borderWidth: 1,
          paddingHorizontal: 10,
          height: 40,
          justifyContent: "center",
        }}
        placeholder={"Image url"}
        enableErrors
        keyboardType={"url"}
        validate={["required", "url"]}
        validationMessage={["Field is required", "Pls give image url"]}
        showCharCounter
        maxLength={100}
      />
      <Button
        title="scan barcode"
        onPress={() => {
          setScaning(true);
        }}
      />
      <Button
        title="Add new product"
        onPress={() => {
          createProduct({
            variables: {
              input: {
                barcode,
                name: productname,
                price: price,
                remaining: 0,
              },
            },
            onCompleted: (data) => {
              console.log({ data });
            },
            onError: (error) => {
              console.error(JSON.stringify(error, null, 2));
            },
          });
        }}
      />
      {scaning && (
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <View style={{ position: "absolute", bottom: 0, right: 120 }}>
              <Button
                title={"Tap to Scan Again"}
                onPress={() => setScanned(false)}
              />
              <Button
                title={"Done scaning"}
                onPress={() => setScaning(false)}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default App;
