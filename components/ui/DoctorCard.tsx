import { Doctor } from '@/types';
import { HStack } from './HStack';
import { Image } from 'expo-image';
import { VStack } from './Vstack';
import { MyText } from './MyText';
import { Card } from './Card';

export const DoctorCard = ({ item }: { item: Doctor }) => {
  return (
    <Card>
      <HStack alignItems="center" px={15} gap={10} mb={10}>
        <Image
          source={{
            uri: `https://247pharmacy.net/Uploads/doctor-${item?.doctorid}.jpeg`,
          }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
          contentFit="cover"
        />

        <VStack>
          <MyText
            text={item?.Doctor}
            style={{ fontFamily: 'PoppinsBold', fontSize: 13 }}
          />
          <MyText
            text={item?.categoryName}
            style={{ fontFamily: 'PoppinsMedium', fontSize: 12, color: 'gray' }}
          />
        </VStack>
      </HStack>
      <HStack justifyContent="space-between" px={15}>
        <MyText
          text={item?.Startime}
          style={{ fontFamily: 'PoppinsBold', fontSize: 15, color: 'gray' }}
        />
        <MyText
          text={`₦${item?.Price}`}
          style={{ fontFamily: 'PoppinsBold', fontSize: 15, color: 'gray' }}
        />
      </HStack>
    </Card>
  );
};
