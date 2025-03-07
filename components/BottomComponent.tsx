import { StyleSheet } from 'react-native';

import { Doctors } from '@/types';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HStack } from '@/components/ui/HStack';
import { MyText } from '@/components/ui/MyText';
import { VStack } from '@/components/ui/Vstack';
import { useShowBottom } from '@/lib/zustand/useShowBottom';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const limitText = (text: string) => {
  if (text?.length > 12) {
    return text.slice(0, 12) + '...';
  }
  return text;
};

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export const DoctorCard = ({ item }: { item: Doctors }) => {
  const router = useRouter();
  const { onClose } = useShowBottom();
  const onPress = () => {
    router.push(`/doctor/${item?.sessionId}`);
    onClose();
  };

  return (
    <Card
      style={{
        paddingVertical: 20,
        backgroundColor: '#F8F8F8',
        marginBottom: 15,
        flex: 1,
      }}
    >
      <HStack alignItems="center" px={15} gap={10} mb={10}>
        <Image
          source={{
            uri: `https://247pharmacy.net/Uploads/doctor-${item?.doctorid}.jpeg`,
          }}
          style={styles.img}
          contentFit="cover"
        />

        <VStack>
          <MyText
            text={item?.Doctor}
            style={{ fontFamily: 'PoppinsBold', fontSize: 14 }}
          />
          <HStack alignItems="center" gap={10}>
            <MyText
              text={limitText(item?.categoryName)}
              style={{
                fontFamily: 'PoppinsMedium',
                fontSize: 12,
                color: 'gray',
              }}
            />
            <MyText
              text={item?.Startime}
              style={{
                fontFamily: 'PoppinsMedium',
                fontSize: 12,
                color: 'gray',
              }}
            />
          </HStack>
        </VStack>
      </HStack>
      <VStack px={15} width="100%">
        <Button text="View Details" onPress={onPress} />
      </VStack>
    </Card>
  );
};
