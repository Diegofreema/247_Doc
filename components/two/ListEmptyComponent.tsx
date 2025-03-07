import { VStack } from "@/components/ui/Vstack";
import { HStack } from "@/components/ui/HStack";
import { colors } from "@/constants/Colors";
import { MyText } from "@/components/ui/MyText";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";

export const ListEmptyComponent = () => {
  return (
    <VStack height={"100%"} width={"100%"}>
      <HStack
        backgroundColor={colors.textGreen}
        p={20}
        borderRadius={10}
        alignItems="center"
        gap={10}
        mb={20}
      >
        <VStack>
          <MyText
            text="You currently don’t have any
appointment at the moment"
            style={{
              fontSize: 13,
              color: "white",
              fontFamily: "PoppinsMedium",
            }}
          />
          <Pressable onPress={() => router.push("/home")}>
            <HStack
              gap={5}
              alignItems="center"
              p={10}
              borderRadius={10}
              backgroundColor={colors.textGreen2}
              mt={10}
            >
              <FontAwesome name="calendar" color="white" size={13} />
              <MyText
                text="Book an Appointment"
                style={{
                  fontSize: 13,
                  color: "white",
                  fontFamily: "Poppins",
                }}
              />
            </HStack>
          </Pressable>
        </VStack>

        <Image
          source={require("@/assets/images/empty.png")}
          style={{ width: 100, height: 100 }}
          contentFit="contain"
        />
      </HStack>
    </VStack>
  );
};
