import { mapLayoutPropsToStyle } from '@/lib/utils';
import { UtilityProps } from '@/types';
import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

export const VStack = ({
  children,
  flexDirection = 'column',
  ...props
}: PropsWithChildren<UtilityProps>) => {
  return (
    <View style={mapLayoutPropsToStyle({ flexDirection, ...props })}>
      {children}
    </View>
  );
};
