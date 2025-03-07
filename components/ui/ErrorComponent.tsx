import { Text, View } from "react-native";
import { Button } from "./Button";

export function ErrorComponent({ retry }: { retry: () => void }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 700,
          textAlign: "center",
          fontFamily: "PoppinsMedium",
          color: "black",
        }}
      >
        Something went wrong
      </Text>
      <Button width={250} onPress={retry} text="Try Again?" />
    </View>
  );
}
