import { Container } from '@/components/Container';
import { BoldHeader } from '@/components/ui/BoldHeader';
import { Button } from '@/components/ui/Button';
import { NavHeader } from '@/components/ui/NavHeader';
import { VStack } from '@/components/ui/Vstack';
import { colors } from '@/constants/Colors';
import { api, generateFiveRandomNumber } from '@/lib/utils';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { OtpInput, OtpInputRef } from 'react-native-otp-entry';
import { toast } from 'sonner-native';

const { width } = Dimensions.get('window');
const size = width / 5 - 20;
const ResetToken = () => {
  const { token, email, id } = useLocalSearchParams<{
    token: string;
    email: string;
    id: string;
  }>();
  const [value, setValue] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [localToken, setLocalToken] = useState(token);
  const otpRef = useRef<OtpInputRef | null>(null);

  const submitToken = async () => {
    if (localToken !== value) {
      toast.error('Token does not match', {
        description: 'Please try again',
      });
      otpRef.current?.clear();
      setValue('');
      return;
    }
    toast.success('Success', {
      description: 'Token matches',
    });
    otpRef.current?.clear();
    setValue('');
    router.replace(`/reset-password?id=${id}&email=${email}`);
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleResendToken = async () => {
    if (!email) {
      toast.error('Missing email');
      router.back();
      return;
    }
    setCountdown(60);
    setCanResend(false);
    const tok = generateFiveRandomNumber();
    setLocalToken(tok);
    try {
      const { data } = await axios.post(
        `${api}?api=reset247docpassword&patientemail=${email}&passcode=${tok}`
      );
      if (data.result === 'invalid email') {
        toast.info('Email does not exist');
        return;
      }
      if (data.result) {
        toast.success('New token has been sent to your email');
      }
    } catch (error) {
      console.log(error);

      toast.error('Failed to send token');
    }
  };
  return (
    <Container>
      <NavHeader />
      <VStack mt={30}>
        <BoldHeader
          text="Reset token"
          subText="Please enter the 5 digit token sent to your email"
        />
      </VStack>
      <VStack mt={20} gap={10}>
        <OtpInput
          ref={otpRef}
          numberOfDigits={5}
          focusColor="green"
          autoFocus
          hideStick={false}
          placeholder="******"
          blurOnFilled={true}
          type="numeric"
          secureTextEntry
          focusStickBlinkingDuration={500}
          onFocus={() => console.log('Focused')}
          onBlur={() => console.log('Blurred')}
          onTextChange={(text) => setValue(text)}
          onFilled={(text) => console.log(`OTP is ${text}`)}
          textInputProps={{
            accessibilityLabel: 'One-Time Token',
          }}
          theme={{
            containerStyle: styles.container,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            placeholderTextStyle: styles.placeholderText,
            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
            disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
          }}
        />
        <Text
          onPress={handleResendToken}
          disabled={!canResend}
          style={{
            fontFamily: 'Poppins',
            color: canResend ? colors.textGreen : 'gray',
            textAlign: 'right',
          }}
        >
          {canResend ? 'Resend Token' : `Resend in ${countdown}s`}
        </Text>
        <Button
          text="Submit"
          onPress={submitToken}
          backgroundColor={colors.textGreen}
          color="white"
          disabled={value.length < 5}
        />
      </VStack>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  pinCodeContainer: {
    borderRadius: 100,
    height: size,
    width: size,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinCodeText: {},
  focusStick: {},
  activePinCodeContainer: {},
  placeholderText: {},
  filledPinCodeContainer: {},
  disabledPinCodeContainer: {},
});

export default ResetToken;
