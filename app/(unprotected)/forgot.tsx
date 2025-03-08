import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Container } from '@/components/Container';
import { VStack } from '@/components/ui/Vstack';
import { BoldHeader } from '@/components/ui/BoldHeader';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/Colors';
import { NavHeader } from '@/components/ui/NavHeader';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { forgotSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { api, generateFiveRandomNumber } from '@/lib/utils';
import { toast } from 'sonner-native';
import { CustomInput } from '@/components/form/CustomInput';

const Forget = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof forgotSchema>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (value: z.infer<typeof forgotSchema>) => {
    const token = generateFiveRandomNumber();
    try {
      const { data } = await axios.post(
        `${api}?api=reset247docpassword&patientemail=${value.email}&passcode=${token}`
      );

      console.log(data.result);

      if (data.result === 'invalid email') {
        toast.error('Please try again try a different email', {
          description: 'This Email is not found',
        });

        return;
      }

      if (data.result) {
        toast.success('Please check your email', {
          description: 'We sent you a 5 digit token',
        });
        router.push(
          `/reset-token?token=${token}&email=${value.email}&id=${data.result}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error('Please try again', {
        description: 'Something went wrong',
      });
    }
  };

  const navigate = () => {
    router.back();
  };
  return (
    <Container>
      <NavHeader />
      <VStack mt={30}>
        <BoldHeader
          text="Forgot Password"
          subText="Let us help you get back into your account"
        />
      </VStack>
      <VStack mt={40} gap={25}>
        <CustomInput
          control={control}
          errors={errors}
          name="email"
          placeholder="Johndoe@gmail.com"
          label="Email"
          type="email-address"
        />

        <Button
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          text="Submit"
        />

        <Pressable
          onPress={navigate}
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 },
            { padding: 4 },
          ]}
        >
          <Text style={styles.createAccountText}>
            Remember password ? <Text style={styles.text}>login</Text>
          </Text>
        </Pressable>
      </VStack>
    </Container>
  );
};

export default Forget;
const styles = StyleSheet.create({
  text: {
    color: colors.textGreen,
    fontFamily: 'Poppins',
  },
  textContainer: {
    alignSelf: 'flex-end',
  },
  createAccountText: {
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});
