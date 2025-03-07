import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import {
  useGetAll,
  useGetCategories,
  useGetSpecialists,
} from '@/lib/tanstack/queries';

import { useState } from 'react';

import { colors } from '@/constants/Colors';

import { AllComponent } from '@/components/AllComponent';
import { AppointmentCard } from '@/components/AppointmentCard';
import { CategoryList } from '@/components/Category';
import { MenuComponent } from '@/components/Home/Menu';
import { CustomModal } from '@/components/Modal/DeleteModal';
import { SubCat } from '@/components/SubCat';
import { BoldHeader } from '@/components/ui/BoldHeader';
import { ErrorComponent } from '@/components/ui/ErrorComponent';
import { HStack } from '@/components/ui/HStack';
import { Loading } from '@/components/ui/Loading';
import { VStack } from '@/components/ui/Vstack';
import { useDeleteProfile } from '@/lib/tanstack/mutation';
import { router } from 'expo-router';

export default function TabOneScreen() {
  const [category, setCategory] = useState('All');
  // const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const { mutate, isPending: isPendingDelete } = useDeleteProfile();

  const { data, isPending, refetch, isError, isPaused } = useGetCategories();
  const {
    data: dataSpecialists,
    isPending: isPendingSpecialists,
    refetch: refetchSpecialists,
    isError: isErrorSpecialists,
    isPaused: isPausedSpecialists,
  } = useGetSpecialists(category);
  const {
    data: dataAll,
    isPending: isPendingAll,
    refetch: refetchAll,
    isError: isErrorAll,
    isPaused: isPausedAll,
  } = useGetAll();
  // const onShowLogOutModal = useCallback(() => setShowLogoutModal(true), []);
  // const onHideLogOutModal = useCallback(() => setShowLogoutModal(false), []);
  const { width } = useWindowDimensions();
  const handleRefetch = () => {
    refetch();
    refetchSpecialists();
    refetchAll();
  };
  if (
    isError ||
    isErrorSpecialists ||
    isPaused ||
    isPausedSpecialists ||
    isErrorAll ||
    isPausedAll
  ) {
    return <ErrorComponent retry={handleRefetch} />;
  }
  if (isPending || isPendingAll) {
    return <Loading />;
  }

  const onSelect = (item: string) => {
    console.log('🚀 ~ onSelect ~ item:', item);

    if (item === 'All') {
      setCategory('All');
    } else {
      setCategory(item);
    }
  };
  const onSubSelect = (item: string) => {
    router.push(`/category?category=${item}`);
  };

  const onCloseModal = () => {
    setIsVisible(false);
  };
  const onOpeDeleteModal = () => {
    setIsVisible(true);
  };
  const onDelete = () => {
    mutate();
  };

  const isIPad = width > 800;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CustomModal
        isVisible={isVisible}
        onPress={onCloseModal}
        onDelete={onDelete}
        isPending={isPendingDelete}
      />
      {/* <CustomModal
        isVisible={showLogoutModal}
        onPress={onCloseModal}
        onDelete={onDelete}
        isPending={isPendingDelete}
      /> */}
      <VStack mx="auto" width={isIPad ? '80%' : '100%'}>
        <VStack px={20}>
          <VStack mt={20} gap={10}>
            <HStack justifyContent="space-between">
              <BoldHeader text="247Doc" />

              <MenuComponent onOpen={onOpeDeleteModal} />
            </HStack>
          </VStack>
        </VStack>
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
            backgroundColor: 'transparent',
          }}
        >
          <AppointmentCard />
        </View>

        <View style={styles.cat}>
          <CategoryList cat={category} categories={data} onPress={onSelect} />
        </View>
        <View style={styles.cat}>
          {category === 'All' && <AllComponent data={dataAll} />}
          {isPendingSpecialists ? (
            <VStack justifyContent="center" alignItems="center">
              <ActivityIndicator color={colors.textGreen} />
            </VStack>
          ) : (
            <SubCat
              subCategory={dataSpecialists}
              onPress={onSubSelect}
              category={category}
            />
          )}
        </View>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cat: {
    backgroundColor: 'transparent',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
