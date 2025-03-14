import { StyleSheet, Text, View } from 'react-native';

type Props = {
  text: string;
};

export const EmptyText = ({ text }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text
        style={{ fontFamily: 'PoppinsBold', fontSize: 15, textAlign: 'center' }}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
