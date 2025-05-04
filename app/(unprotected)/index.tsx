import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { useAuth } from '@/lib/zustand/auth';
import axios from 'axios';
import { toast } from 'sonner-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@/components/Container';
import { VStack } from '@/components/ui/Vstack';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/Colors';
import { BoldHeader } from '@/components/ui/BoldHeader';
import { LoadingComponent } from '@/components/Modal/LoadingComponent';
import { api } from '@/lib/utils';
import { CustomInput } from '@/components/form/CustomInput';
import { useFirst } from '@/lib/zustand/useFirst';
const Login = () => {
  const router = useRouter();
  const [secured, setSecured] = useState(true);
  const toggleSecure = () => setSecured((prev) => !prev);
  const isFirst = useFirst((state) => state.isFirst);
  const { setUser } = useAuth();
  const { width } = useWindowDimensions();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },

    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const formattedPassword = values.password
      .replace(/[#?\/\\%&]/g, '')
      .replace(/:/g, '');
    try {
      const { data } = await axios.post(
        `${api}?api=signin&patientemail=${values.email.toLowerCase()}&pasword1=${formattedPassword}`
      );

      if (data?.result === 'incorrect credentials') {
        toast.error('Please try again', {
          description: 'Incorrect credentials',
        });
        return;
      }
      if (data.result === 'failed') {
        toast.error('Please try again', {
          description: 'Something went wrong',
        });
        return;
      }
      toast.success('Success', {
        description: 'Welcome back',
      });
      setUser({
        email: data.email,
        firstName: data.fname,
        lastName: data.lname,
        ref: data.ref,
        tel: data.tel,
      });
      router.push('/home');
    } catch (error) {
      console.log(error);
      toast.error('Please try again', {
        description: 'Something went wrong',
      });
    }
  };

  const navigate = () => {
    router.push('/signUp');
  };

  const isIPad = width > 500;
  if (isFirst) {
    return <Redirect href="/onboard" />;
  }
  return (
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
        <VStack mt={30}>
          <BoldHeader
            text="Sign in"
            subText="Enter your Login details on to continue"
          />
        </VStack>

        <VStack mt={40} gap={25}>
          <CustomInput
            control={control}
            errors={errors}
            name="email"
            placeholder="visual@gmail.com"
            label="Email"
            type="email-address"
          />

          <CustomInput
            control={control}
            errors={errors}
            name="password"
            placeholder="********"
            label="Password"
            password
            secureTextEntry={secured}
            toggleSecure={toggleSecure}
          />

          <Pressable
            onPress={() => router.push('/forgot')}
            style={({ pressed }) => [
              styles.textContainer,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text style={styles.text}>Forgot password</Text>
          </Pressable>

          <Button
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            text="Login"
          />

          <Pressable
            onPress={navigate}
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1 },
              { padding: 4 },
            ]}
          >
            <Text style={styles.createAccountText}>
              Don’t have an account?{' '}
              <Text style={styles.text}>Create Account</Text>
            </Text>
          </Pressable>
        </VStack>
      </Container>
    </ScrollView>
  );
};

export default Login;

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
