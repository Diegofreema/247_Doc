import React from 'react';
import {View} from 'react-native';
import {MyText} from './MyText';


export const BookedSession = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MyText
        text="This  session has been booked. Please try a different session"
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontFamily: 'PoppinsBold',
        }}
      />
    </View>
  );
};
