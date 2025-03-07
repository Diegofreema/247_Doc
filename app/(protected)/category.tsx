import { DoctorCard } from '@/components/BottomComponent';
import { Container } from '@/components/Container';
import { EmptyText } from '@/components/EmptyText';
import { ErrorComponent } from '@/components/ui/ErrorComponent';
import { Loading } from '@/components/ui/Loading';
import { NavHeader } from '@/components/ui/NavHeader';
import { useGetSession } from '@/lib/tanstack/queries';
import { Doctors } from '@/types';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const Category = () => {
  const { category } = useLocalSearchParams<{ category: string }>();
  const { data, isPending, refetch, isError, isPaused } =
    useGetSession(category);
  if (isError || isPaused) {
    return <ErrorComponent retry={refetch} />;
  }

  if (isPending) {
    return <Loading />;
  }
  return (
    <Container>
      <NavHeader />
      <FlashList
        data={data}
        renderItem={({ item }: { item: Doctors }) => <DoctorCard item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyText text="We currently do not have availability on your selected date" />
        )}
        keyExtractor={(item: Doctors) => item.sessionId?.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </Container>
  );
};

export default Category;
