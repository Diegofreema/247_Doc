import { UpComingSessions } from "@/types";
import * as Linking from "expo-linking";
import { Platform, Pressable } from "react-native";
import { VStack } from "@/components/ui/Vstack";
import { colors } from "@/constants/Colors";
import { HStack } from "@/components/ui/HStack";
import { MyText } from "@/components/ui/MyText";
import { FontAwesome } from "@expo/vector-icons";

export const AppointmentCardsItem = ({ item }: { item: UpComingSessions }) => {
  const onPress = () => {
    Linking.openURL(item?.meetingLink);
  };
  const openDialScreen = () => {
    let number = "";
    if (Platform.OS === "ios") {
      number = "telprompt:${item?.doctorPhone}";
    } else {
      number = "tel:${item?.doctorPhone}";
    }
    Linking.openURL(number);
  };
  return (
    <VStack
      backgroundColor={colors.textGreen}
      p={20}
      width={"100%"}
      flex={1}
      borderRadius={10}
    >
      <HStack alignItems="center" gap={10} mb={20}>
        <VStack>
          <MyText
            text={item?.doctorName}
            style={{ fontSize: 18, color: "white", fontFamily: "PoppinsBold" }}
          />
          <MyText
            text={item?.doctorEmail}
            style={{
              fontSize: 13,
              color: "white",
              fontFamily: "Poppins",
            }}
          />
          <Pressable
            onPress={openDialScreen}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              paddingVertical: 4,
            })}
          >
            <MyText
              text={item?.doctorPhone}
              style={{
                fontSize: 11,
                color: "white",
                fontFamily: "Poppins",
              }}
            />
          </Pressable>
        </VStack>
      </HStack>

      <HStack
        justifyContent="space-between"
        p={10}
        borderRadius={10}
        backgroundColor={colors.textGreen2}
        alignItems="center"
      >
        <HStack gap={5} alignItems="center">
          <FontAwesome name="calendar" color="white" size={13} />
          <MyText
            text={item?.date}
            style={{ fontSize: 10, color: "white", fontFamily: "Poppins" }}
          />
        </HStack>
        <HStack gap={5} alignItems="center">
          <FontAwesome name="clock-o" color="white" size={13} />
          <MyText
            text={item?.sessionStartTimex}
            style={{ fontSize: 10, color: "white", fontFamily: "Poppins" }}
          />
        </HStack>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              padding: 4,
              backgroundColor: colors.textGreen,
              borderRadius: 5,
            },
          ]}
        >
          <MyText
            text={"Meeting link"}
            style={{
              fontSize: 10,
              color: "white",
              fontFamily: "PoppinsBold",
            }}
          />
        </Pressable>
      </HStack>
    </VStack>
  );
};
