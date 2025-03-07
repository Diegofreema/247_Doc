import { colors } from '@/constants/Colors';
import { ActivityIndicator, View } from 'react-native';

export const Loading = (): JSX.Element => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <ActivityIndicator size="large" color={colors.textGreen} />
    </View>
  );
};
