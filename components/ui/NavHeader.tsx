import { AntDesign } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { HStack } from './HStack';

export const NavHeader = () => {
  const router = useRouter();

  const navigate = () => {
    router.back();
  };
  return (
    <HStack my={10}>
      <Pressable
        onPress={navigate}
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 },
          { padding: 4 },
        ]}
      >
        <AntDesign name="arrowleft" size={30} color="black" />
      </Pressable>
    </HStack>
  );
};
