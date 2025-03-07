import { FlatList, useWindowDimensions, View } from "react-native";
import { useComingSessions } from "@/lib/tanstack/queries";
import { useAuth } from "@/lib/zustand/auth";
import { ErrorComponent } from "@/components/ui/ErrorComponent";
import { Loading } from "@/components/ui/Loading";
import { HStack } from "@/components/ui/HStack";
import { MyText } from "@/components/ui/MyText";
import { ListEmptyComponent } from "@/components/two/ListEmptyComponent";
import { AppointmentCardsItem } from "@/components/two/AppointmentCardItem";

const Appointment = () => {
  const { id } = useAuth();
  const { width } = useWindowDimensions();
  const isIPad = width > 500;
  const {
    data,
    isPending,
    refetch,
    isError,
    isPaused,
    isRefetching,
    isRefetchError,
  } = useComingSessions(id);

  if (isError || isPaused || isRefetchError) {
    return <ErrorComponent retry={refetch} />;
  }
  if (isPending) {
    return <Loading />;
  }

  return (
    <FlatList
      data={data}
      onRefresh={refetch}
      refreshing={isRefetching}
      ListHeaderComponent={() => (
        <HStack justifyContent="space-between" alignItems="center">
          <MyText
            text="Appointments"
            style={{
              fontSize: 20,
              color: "black",
              fontFamily: "PoppinsBold",
            }}
          />
        </HStack>
      )}
      keyExtractor={(item, index) => index?.toString()}
      renderItem={({ item }) => <AppointmentCardsItem item={item} />}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      contentContainerStyle={{
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: "transparent",
        flexGrow: 1,
        width: isIPad ? "90%" : "100%",
        marginHorizontal: "auto",
        gap: 20,
      }}
      style={{ backgroundColor: "white" }}
      ListEmptyComponent={() => <ListEmptyComponent />}
      numColumns={isIPad ? 2 : 1}
      columnWrapperStyle={isIPad ? { gap: 20 } : null}
    />
  );
};

export default Appointment;
