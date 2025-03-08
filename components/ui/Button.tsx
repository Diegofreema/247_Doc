import { colors } from '@/constants/Colors';
import { mapLayoutPropsToStyle } from '@/lib/utils';
import { UtilityProps } from '@/types';
import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { Icon } from '@tabler/icons-react-native';

export const Button = ({
  backgroundColor = colors.textGreen,
  color = 'white',
  disabled = false,
  loading,
  text,
  icon: CustomIcon,
  height = 50,
  onPress,
  ...props
}: UtilityProps & {
  color?: string;
  disabled?: boolean;
  text?: string;
  icon?: Icon;
  loading?: boolean;
  onPress: () => void;
}) => {
  const reduceOpacity = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={reduceOpacity}
      style={({ pressed }) => [
        { opacity: pressed || reduceOpacity ? 0.5 : 1 },
        mapLayoutPropsToStyle({
          px: 10,
          py: 5,
          borderRadius: 8,
          backgroundColor,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          ...props,
        }),
      ]}
    >
      {CustomIcon && !loading && (
        <CustomIcon
          color={color}
          size={20}
          style={{
            marginRight: 5,
          }}
        />
      )}
      {text && !loading && (
        <Text style={{ color: color, fontFamily: 'PoppinsMedium' }}>
          {text}
        </Text>
      )}
      {loading && <ActivityIndicator color={'white'} />}
    </Pressable>
  );
};
