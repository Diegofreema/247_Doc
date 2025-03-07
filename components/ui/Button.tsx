import {colors} from '@/constants/Colors';
import {mapLayoutPropsToStyle} from '@/lib/utils';
import {UtilityProps} from '@/types';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {Icon} from '@tabler/icons-react-native';

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
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1, },
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
      {CustomIcon && (
        <CustomIcon
          color={color}
          size={20}
          style={{
            marginRight: 5,
          }}
        />
      )}
      {text && (
        <Text style={{ color: color, fontFamily: 'PoppinsMedium' }}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};
