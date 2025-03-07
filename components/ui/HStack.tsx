import { mapLayoutPropsToStyle } from '@/lib/utils';
import { UtilityProps } from '@/types';
import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

export const HStack = ({
  children,
  flexDirection = 'row',
  ...props
}: PropsWithChildren<UtilityProps>) => {
  return (
    <View style={mapLayoutPropsToStyle({ flexDirection, ...props })}>
      {children}
    </View>
  );
};
