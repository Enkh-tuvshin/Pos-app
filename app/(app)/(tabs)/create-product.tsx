"use client";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, TextField } from "react-native-ui-lib";
import { gql, useMutation } from "@apollo/client";
import { BarcodeIcon } from "@/icons/BarcodeIcon";

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
  const [hasPermission, setHasPermission] = useState(false);
  const [productname, setProductname] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanning(false);
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
        placeholderTextColor="#000"
        style={styles.input}
        placeholder={"Нэр"}
        enableErrors
        validate={["required"]}
        validationMessage={["Field is required"]}
        maxLength={100}
        onChange={setProductname}
      />
      <TextField
        placeholderTextColor="#000"
        style={styles.input}
        placeholder={"Price"}
        enableErrors
        keyboardType={"numeric"}
        validate={["required", "number"]}
        validationMessage={["Field is required", "only number"]}
        maxLength={100}
        onChange={setPrice}
      />
      <TextField
        placeholderTextColor="#000"
        style={styles.input}
        placeholder={"Үлдэгдэл"}
        enableErrors
        keyboardType={"numeric"}
        validate={["required"]}
        validationMessage={["Field is required", "number!!!"]}
        maxLength={100}
      />
      <View style={{ position: "relative" }}>
        <TextField
          placeholderTextColor="#000"
          style={styles.input}
          placeholder={"Бар код"}
          enableErrors
          value={barcode}
          keyboardType={"url"}
          validate={["required"]}
          validationMessage={["Field is required"]}
          maxLength={100}
        />
        <Button
          onPress={() => {
            setScanning(true);
          }}
          style={{ position: "absolute", right: 0, top: 0, bottom: 0, height: 50, borderRadius: 10, backgroundColor: "rgba(0,0,0,.2)" }}
        >
          <BarcodeIcon color="white" />
        </Button>
      </View>

      <Button
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 100 }}
        borderRadius={0}
        labelStyle={{ fontWeight: "bold", textTransform: "uppercase" }}
        label="Барааг бүртгэх"
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
      {scanning && (
        <>
          <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
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
  input: {
    borderWidth: 1,
    color: "#000",
    borderColor: "rgba(0,0,0,.3)",
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default App;
