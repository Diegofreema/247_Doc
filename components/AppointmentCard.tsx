import { Image } from 'expo-image';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';
import { SeeAll } from './SeeAll';
import { useRouter } from 'expo-router';
import { useComingSessions } from '@/lib/tanstack/queries';
import { useAuth } from '@/lib/zustand/auth';

import { UpComingSessions } from '@/types';
import * as Linking from 'expo-linking';
import { ErrorComponent } from '@/components/ui/ErrorComponent';
import { Loading } from '@/components/ui/Loading';
import { VStack } from '@/components/ui/Vstack';
import { HStack } from '@/components/ui/HStack';
import { MyText } from '@/components/ui/MyText';

export const AppointmentCard = (): JSX.Element => {
  const { user } = useAuth();
  const { data, isPending, refetch, isError, isPaused, isRefetching } =
    useComingSessions(user?.ref!);

  const router = useRouter();
  if (isError || isPaused) {
    return <ErrorComponent retry={refetch} />;
  }
  if (isPending) {
    return <Loading />;
  }
  const hasAppointments = !!data?.length;
  return (
    // @ts-ignore
    <>
      <View style={{ paddingRight: 20 }}>
        <SeeAll
          text="Appointments"
          onPress={() => router.push('/two')}
          subText={hasAppointments ? 'See all' : ''}
        />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        scrollEventThrottle={16}
        // onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          paddingVertical: 20,
          paddingRight: 10,
          backgroundColor: 'transparent',
          gap: 10,
        }}
      >
        {data?.length === 0 && <ListEmptyComponent />}
        {data?.length > 0 &&
          data?.slice(0, 3).map((item, index) => {
            return <AppointmentCardsItem key={index} item={item} />;
          })}
      </ScrollView>
    </>
  );
};

const AppointmentCardsItem = ({ item }: { item: UpComingSessions }) => {
  const { width } = useWindowDimensions();

  const onPress = () => {
    Linking.openURL(item?.meetingLink);
  };
  return (
    <VStack
      backgroundColor={colors.textGreen}
      p={20}
      width={width * 0.9}
      borderRadius={10}
    >
      <HStack alignItems="center" gap={10} mb={20}>
        <VStack>
          <MyText
            text={item?.doctorName}
            style={{ fontSize: 18, color: 'white', fontFamily: 'PoppinsBold' }}
          />
          {/* <MyText
            text={item?.doctorEmail}
            style={{
              fontSize: 13,
              color: 'white',
              fontFamily: 'Poppins',
            }}
          />
          <MyText
            text={item?.doctorPhone}
            style={{
              fontSize: 11,
              color: 'white',
              fontFamily: 'Poppins',
            }}
          /> */}
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
            style={{ fontSize: 10, color: 'white', fontFamily: 'Poppins' }}
          />
        </HStack>
        <HStack gap={5} alignItems="center">
          <FontAwesome name="clock-o" color="white" size={13} />
          <MyText
            text={item?.sessionStartTimex}
            style={{ fontSize: 10, color: 'white', fontFamily: 'Poppins' }}
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
            text={'Meeting link'}
            style={{
              fontSize: 10,
              color: 'white',
              fontFamily: 'PoppinsBold',
            }}
          />
        </Pressable>
      </HStack>
    </VStack>
  );
};

const ListEmptyComponent = () => {
  const { width } = useWindowDimensions();
  return (
    <VStack
      backgroundColor={colors.textGreen}
      p={20}
      width={width - 35}
      borderRadius={10}
    >
      <HStack alignItems="center" gap={10} mb={20}>
        <VStack>
          <MyText
            text="You currently don’t have any
appointment at the moment"
            style={{
              fontSize: 13,
              color: 'white',
              fontFamily: 'PoppinsMedium',
            }}
          />
          <Pressable>
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
                  color: 'white',
                  fontFamily: 'Poppins',
                }}
              />
            </HStack>
          </Pressable>
        </VStack>

        <Image
          source={require('@/assets/images/empty.png')}
          style={{ width: 100, height: 100 }}
          contentFit="contain"
        />
      </HStack>
    </VStack>
  );
};
