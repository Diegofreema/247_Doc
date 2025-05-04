import { UtilityProps } from '@/types';
import { ViewStyle } from 'react-native';
import * as Linking from 'expo-linking';

export const api = process.env.EXPO_PUBLIC_API!;
export const mapLayoutPropsToStyle = (
  props: Partial<UtilityProps>
): ViewStyle => {
  const {
    p,
    pl,
    pr,
    pt,
    pb,
    m,
    ml,
    mr,
    mt,
    mb,
    gap,
    alignItems,
    justifyContent,
    backgroundColor,
    borderRadius,
    flexDirection,
    width,
    flex,
    mx,
    my,
    px,
    py,
    height,
  } = props;

  return {
    padding: p,
    paddingLeft: pl,
    paddingRight: pr,
    paddingTop: pt,
    paddingHorizontal: px,
    paddingVertical: py,

    paddingBottom: pb,
    margin: m,
    marginLeft: ml,
    marginRight: mr,
    marginTop: mt,
    marginBottom: mb,
    marginVertical: my,
    marginHorizontal: mx,
    flex,
    gap,
    alignItems,
    justifyContent,
    backgroundColor,
    borderRadius,
    flexDirection,
    width,
    height,
  };
};

export const generateFiveRandomNumber = () => {
  let token = '';
  for (let i = 0; i < 5; i++) {
    token += Math.floor(Math.random() * 10);
  }
  return token;
};

type Props = {
  name: string;
  amount: string;
  email: string;
  ref: string;
  phoneNumber: string;
};

export const goToWebsite = async ({
  amount,
  email,
  name,
  ref,
  phoneNumber,
}: Props) => {
  const link = `https://blog.247pharmacy.net/users/checkoutmobiledoc/${encodeURIComponent(
    name
  )}/${amount}/${email}/${phoneNumber}/${ref}`;
  await Linking.openURL(link);
};
