import React, { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Card = ({ children, style }: PropsWithChildren<Props>) => {
  return (
    <View
      style={[
        {
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 20,
          boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.2)',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
