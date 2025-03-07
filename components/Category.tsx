import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import * as Haptics from "expo-haptics";

import { FontAwesome, Fontisto } from "@expo/vector-icons";

import { colors } from "@/constants/Colors";
import { Category } from "@/types";
import { useRef } from "react";
import { HStack } from "@/components/ui/HStack";
import { VStack } from "@/components/ui/Vstack";
import { MyText } from "@/components/ui/MyText";
import { SeeAll } from "@/components/SeeAll";

export const CategoryList = ({
  categories,
  onPress,
  cat,
}: {
  categories: Category[];
  onPress: (text: string) => void;
  cat: string;
}): JSX.Element => {
  const scrollRef = useRef<ScrollView | null>(null);
  const { width } = useWindowDimensions();
  const isIPad = width > 500;
  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };
  return (
    <View>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <SeeAll onPress={() => {}} text="Medical Practitioner Category" />
          {!isIPad && (
            <Pressable
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                padding: 5,
              })}
              onPress={handleNext}
            >
              <FontAwesome color="black" name="arrow-right" size={20} />
            </Pressable>
          )}
        </View>
      </View>
      <HStack justifyContent="space-between" gap={5} mt={10}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: 10, flexGrow: 1 }}
        >
          {categories.map(({ categoryname }, index) => (
            <Pressable
              key={index}
              style={{ minWidth: 80 }}
              onPress={() => onPress(categoryname)}
            >
              <VStack
                key={index}
                justifyContent="center"
                alignItems="center"
                backgroundColor={
                  cat === categoryname ? colors.textGreen : colors.bgGray
                }
                borderRadius={6}
                p={5}
                gap={3}
              >
                <Fontisto
                  name="doctor"
                  size={24}
                  color={cat === categoryname ? "white" : "black"}
                />
                <MyText
                  text={categoryname}
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    fontFamily: "PoppinsBold",
                    color: cat === categoryname ? "white" : "black",
                  }}
                />
              </VStack>
            </Pressable>
          ))}
        </ScrollView>
      </HStack>
    </View>
  );
};
