import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
} from 'react-native';

import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { useState } from 'react';

import axios from 'axios';
import { defaultDateOfBirth, signUpSchema } from '@/validators';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '@/lib/utils';
import { toast } from 'sonner-native';
import { Container } from '@/components/Container';
import { ConfirmModal } from '@/components/Modal/ConfirmModal';
import { NavHeader } from '@/components/ui/NavHeader';
import { BoldHeader } from '@/components/ui/BoldHeader';
import { VStack } from '@/components/ui/Vstack';
import { colors } from '@/constants/Colors';
import { CustomInput } from '@/components/form/CustomInput';
import { Button } from '@/components/ui/Button';

const SignUp = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date(defaultDateOfBirth));
  const [showModal, setShowModal] = useState(false);

  const [secure, setSecure] = useState<boolean>(true);
  const [securedConfirm, setSecuredConfirm] = useState(true);
  const toggleSecure = () => setSecure((prev) => !prev);
  const toggleSecureConfirm = () => setSecuredConfirm((prev) => !prev);
  const [show, setShow] = useState(false);
  const { width } = useWindowDimensions();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      email: '',
      firstName: '',
      address: '',
      confirmPassword: '',
      dateOfBirth: format(defaultDateOfBirth, 'MM/dd/yyyy'),
      gender: '',
      lastName: '',
      password: '',
      phoneNumber: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const {
      address,
      dateOfBirth,
      email,
      firstName,
      gender,
      lastName,
      password,
      phoneNumber,
    } = values;

    const formattedPassword = password
      .replace(/[#?\/\\%&]/g, '')
      .replace(/:/g, '');
    try {
      const { data } = await axios.post(
        `${api}?api=createaccount&patientemail=${email.toLowerCase()}&patientgender=${gender}&patientfname=${firstName}&patientdob=${dateOfBirth}&patientphone=${phoneNumber}&patientadres=${address}&pasword1=${formattedPassword}&patientlname=${lastName}`
      );

      console.log(data?.result);

      if (data.result === 'Success') {
        setShowModal(true);
        return;
      }

      if (data?.result === 'Email Already Exist') {
        toast.error('Email already exist');

        return;
      }
    } catch (error) {
      console.log(error);
      toast.error('Error', {
        description: 'Something went wrong',
      });
    }
  };

  const isIPad = width > 500;

  // const toggleDatePicker = () => {
  //   setShow((prev) => !prev);
  // };
  const onChange = ({ type }: any, selectedDate: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      setValue('dateOfBirth', format(currentDate, 'MM/dd/yyyy'));
    }
  };

  const showMode = () => {
    setShow(true);
  };

  // const onChangeIos = () => {
  //   setValues({ ...values, dateOfBirth: format(date, 'yyyy-MM-dd') });
  // };
  const onPress = () => {
    router.replace('/');
    setShowModal(false);
    reset();
  };

  const { dateOfBirth } = watch();
  return (
    <Container>
      <ConfirmModal onPress={onPress} isVisible={showModal} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
          marginHorizontal: 'auto',
          width: isIPad ? '80%' : '100%',
        }}
      >
        <NavHeader />
        <VStack mt={30}>
          <BoldHeader
            text="Sign up"
            subText="Enter your details on to create account"
          />
        </VStack>

        <VStack mt={40} gap={25}>
          <CustomInput
            control={control}
            errors={errors}
            name="firstName"
            placeholder="John"
            label="First Name"
          />
          <CustomInput
            control={control}
            errors={errors}
            name="lastName"
            placeholder="Doe"
            label="Last Name"
          />
          <CustomInput
            control={control}
            errors={errors}
            name="email"
            placeholder="Johndoe@gmail.com"
            label="Email"
            type="email-address"
          />
          <CustomInput
            control={control}
            errors={errors}
            name="phoneNumber"
            placeholder="08123456789"
            label="Contact Number"
          />

          <>
            <SelectList
              search={false}
              boxStyles={{
                ...styles2.border,
                justifyContent: 'flex-start',
                backgroundColor: 'white',
                alignItems: 'center',
              }}
              inputStyles={{
                textAlign: 'left',
                color: colors.textLight,
              }}
              fontFamily="Poppins"
              setSelected={(key: string) => setValue('gender', key)}
              data={[
                { key: 'male', value: 'Male' },
                { key: 'female', value: 'Female' },
              ]}
              defaultOption={{
                key: 'male',
                value: 'Male',
              }}
              save="key"
              placeholder="Gender"
            />

            {errors.gender && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.gender.message as string}
              </Text>
            )}
          </>
          <>
            {Platform.OS === 'android' && (
              <>
                <Pressable
                  onPress={showMode}
                  style={({ pressed }) => pressed && { opacity: 0.5 }}
                >
                  <TextInput
                    value={dateOfBirth}
                    placeholder="Date of Birth"
                    editable={false}
                    style={{
                      height: 55,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: colors.textGreen,
                      padding: 5,
                    }}
                  />
                </Pressable>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    onChange={onChange}
                    display="spinner"
                  />
                )}
              </>
            )}
            {Platform.OS === 'ios' && (
              <>
                <Text
                  onPress={showMode}
                  style={{
                    height: 55,
                    borderRadius: 5,
                    lineHeight: 55,
                    borderWidth: 1,
                    borderColor: colors.textGreen,
                    paddingHorizontal: 5,
                  }}
                >
                  {format(date, 'dd/MM/yyyy')}
                </Text>
                {show && (
                  <>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={'date'}
                      is24Hour={true}
                      onChange={onChange}
                      display="spinner"
                      style={{ height: 120, marginTop: -10 }}
                    />
                  </>
                )}
              </>
            )}
            {errors.dateOfBirth && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.dateOfBirth.message}
              </Text>
            )}
          </>

          <CustomInput
            control={control}
            errors={errors}
            name="address"
            placeholder="No 5 mark lane"
            label="Address"
          />

          <CustomInput
            control={control}
            errors={errors}
            name="password"
            placeholder="********"
            label="Password"
            password
            secureTextEntry={secure}
            toggleSecure={toggleSecure}
          />
          <CustomInput
            control={control}
            errors={errors}
            name="confirmPassword"
            placeholder="********"
            label="Confirm Password"
            password
            secureTextEntry={securedConfirm}
            toggleSecure={toggleSecureConfirm}
          />

          <Button
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            text="Create Account"
          />
        </VStack>
      </ScrollView>
    </Container>
  );
};

export default SignUp;
const styles2 = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: colors.textGreen,
    borderRadius: 8,
    minHeight: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
