import { Container } from '@/components/Container';
import { CustomInput } from '@/components/form/CustomInput';
import { BoldHeader } from '@/components/ui/BoldHeader';
import { Button } from '@/components/ui/Button';
import { NavHeader } from '@/components/ui/NavHeader';
import { VStack } from '@/components/ui/Vstack';
import { api } from '@/lib/utils';
import { newPasswordSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, useWindowDimensions } from 'react-native';
import { toast } from 'sonner-native';
import { z } from 'zod';
const ResetPassword = () => {
  const router = useRouter();
  const [secured, setSecured] = useState(true);
  const [secured2, setSecured2] = useState(true);
  const { id } = useLocalSearchParams<{ id: string }>();
  const toggleSecure = () => setSecured((prev) => !prev);
  const toggleSecure2 = () => setSecured2((prev) => !prev);

  const { width } = useWindowDimensions();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof newPasswordSchema>>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },

    resolver: zodResolver(newPasswordSchema),
  });
  const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
    const formattedPassword = values.password
      .replace(/[#?\/\\%&]/g, '')
      .replace(/:/g, '');
    try {
      const { data } = await axios.post(
        `${api}?api=reset247docpassword2&pasword1=${formattedPassword}&patientref=${id}
`
      );
      console.log(data?.result);
      if (data?.result) {
        toast.success('Please login in', {
          description: 'Password reset successful',
        });
      }

      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Please try again', {
        description: 'Something went wrong',
      });
    }
  };

  const isIPad = width > 500;
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: 'white' }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
      >
        <Container
          style={{
            width: isIPad ? '80%' : '100%',
            marginHorizontal: 'auto',
          }}
        >
          <NavHeader />
          <VStack mt={30}>
            <BoldHeader text="Create password" subText="Reset password below" />
          </VStack>

          <VStack mt={40} gap={25}>
            <CustomInput
              control={control}
              errors={errors}
              name="password"
              placeholder="*****"
              label="Password"
              secureTextEntry={secured}
              toggleSecure={toggleSecure}
              password
            />

            <CustomInput
              control={control}
              errors={errors}
              name="confirmPassword"
              placeholder="********"
              label="Confirm Password"
              password
              secureTextEntry={secured2}
              toggleSecure={toggleSecure2}
            />

            <Button
              loading={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              text="Reset"
            />
          </VStack>
        </Container>
      </ScrollView>
    </>
  );
};

export default ResetPassword;
