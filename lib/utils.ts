import { UtilityProps } from '@/types';
import { ViewStyle } from 'react-native';

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
      height
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
