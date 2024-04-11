import { useState } from "react";
import { Button, TextField, View } from "react-native-ui-lib";

const LoginPage = () => {
  const [step, setStep] = useState<"request" | "verify">("request");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleRequestOtp = () => {
    setStep("verify");
  };

  const handleBack = () => {
    setStep("request");
  };

  const handleVerifyOtp = () => {};

  if (step == "request")
    return (
      <View flex center>
        <TextField
          placeholder={"Your email"}
          floatingPlaceholder
          onChangeText={setEmail}
          enableErrors
          validate={["required", "email"]}
          validationMessage={["Field is required", "Email is invalid"]}
          showCharCounter
          maxLength={30}
        />
        {/* <Button onPress={handleRequestOtp} label="Send login request" /> */}
      </View>
    );

  return (
    <View flex center>
      <TextField value={email} />
      <TextField
        placeholder={"OTP"}
        floatingPlaceholder
        onChangeText={setOtp}
        enableErrors
        validate={["required"]}
        validationMessage={["Field is required"]}
        showCharCounter
        maxLength={4}
      />
      {/* <Button label="Login" /> */}
    </View>
  );
};
export default LoginPage;
