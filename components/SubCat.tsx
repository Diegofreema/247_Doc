import { Subcategory } from "@/types";
import { FlatList, Pressable, useWindowDimensions, View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { colors } from "@/constants/Colors";
import { MyText } from "@/components/ui/MyText";

export const SubCat = ({
  subCategory,
  onPress,
  category,
}: {
  subCategory: Subcategory[];
  onPress: (item: string) => void;
  category: string;
}) => {
  const { width } = useWindowDimensions();
  const isIPad = width > 500;
  return (
    <FlatList
      scrollEnabled={false}
      data={subCategory}
      renderItem={({ item, index }) => (
        <Animated.View
          entering={SlideInLeft.delay(index * 100)}
          style={{ flex: 1, maxWidth: isIPad ? "48%" : "auto" }}
        >
          <Pressable
            onPress={() => onPress(item.subcategory)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.textGreen : colors.textGray,
                padding: 10,
                borderRadius: 6,
              },
            ]}
          >
            <MyText
              text={item.subcategory}
              style={{ fontFamily: "PoppinsBold" }}
            />
          </Pressable>
        </Animated.View>
      )}
      keyExtractor={(item, index) => index?.toString()}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
      columnWrapperStyle={isIPad ? { gap: 20 } : null}
      numColumns={isIPad ? 2 : 1}
      ListEmptyComponent={() =>
        category !== "All" && (
          <MyText
            text="No doctors available for this category"
            style={{ fontFamily: "PoppinsBold", textAlign: "center" }}
          />
        )
      }
    />
  );
};
