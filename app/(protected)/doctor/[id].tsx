import { useDoctor } from '@/lib/tanstack/queries';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useAuth } from '@/lib/zustand/auth';
import axios from 'axios';
import { paystackProps } from 'react-native-paystack-webview';

import { Button } from '@/components/ui/Button';
import { ErrorComponent } from '@/components/ui/ErrorComponent';
import { Loading } from '@/components/ui/Loading';
import { MyText } from '@/components/ui/MyText';
import { NavHeader } from '@/components/ui/NavHeader';
import { Payment } from '@/components/ui/Payment';
import { VStack } from '@/components/ui/Vstack';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner-native';
import { BookedSession } from '@/components/ui/BookedSession';
import { DoctorCard } from '@/components/ui/DoctorCard';
import { goToWebsite } from '@/lib/utils';

const DoctorDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const isIPad = width > 800;
  const [email, setEmail] = useState('');
  const [sessionFee, setSessionFee] = useState('');
  const [paymentRef, setPaymentRef] = useState('');
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data, isPending, refetch, isError, isPaused } = useDoctor(
    id as string
  );
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  if (isError || isPaused) {
    return <ErrorComponent retry={refetch} />;
  }
  if (isPending) {
    return <Loading />;
  }
  const onInvalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ['upcoming_sessions', user?.ref],
    });
  };
  if (
    // @ts-ignore
    data === 'This  session has been booked. Please try a different session'
  ) {
    return <BookedSession />;
  }

  const onStartTransaction = async () => {
    try {
      const { data: dataRes } = await axios.post(
        `https://247docapi.netpro.software/api.aspx?api=book&sessionid=${id}&patientref=${user?.ref}`
      );

      if (
        dataRes ===
        'This  session has been booked. Please try a different session'
      ) {
        toast.info('Please try  a different session', {
          description:
            'This  session has been booked. Please try a different session',
        });
        return;
      }

      if (dataRes?.sessionFee) {
        setSessionFee(dataRes.sessionFee);
        setPaymentRef(dataRes.paymentRef);
        setEmail(dataRes.email);
        await goToWebsite({
          amount: sessionFee,
          email: user?.email!,
          ref: dataRes.paymentRef,
          name: user?.firstName + ' ' + user?.lastName,
          phoneNumber: user?.tel!,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Please try again', {
        description: 'Something went wrong',
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
      <View
        style={{
          flex: 1,

          width: isIPad ? '80%' : '100%',
          marginHorizontal: 'auto',
        }}
      >
        <NavHeader />
        <Payment
          email={email}
          sessionFee={sessionFee}
          paymentRef={paymentRef}
          // @ts-ignore
          ref={paystackWebViewRef}
          onInvalidate={onInvalidate}
        />

        <DoctorCard item={data} />
        <VStack mt={20} mb={20}>
          <MyText
            text={'Bio'}
            style={{
              fontFamily: 'PoppinsBold',
              color: '#000',
              paddingRight: 20,
            }}
          />
          <MyText
            text={data?.bio}
            style={{
              fontFamily: 'PoppinsBold',
              color: '#000',
              paddingRight: 20,
              width: isIPad ? '80%' : '100%',
              lineHeight: 30,
              fontSize: isIPad ? 20 : 14,
            }}
          />
        </VStack>
        <VStack mt={30}>
          <Button text="Book Appointment" onPress={onStartTransaction} />
        </VStack>
      </View>
    </View>
  );
};

export default DoctorDetails;
