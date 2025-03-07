import { colors } from '@/constants/Colors';
import { useAuth } from '@/lib/zustand/auth';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

type Props = {
  onOpen: () => void;
};

export const MenuComponent = ({ onOpen }: Props) => {
  const { clearId } = useAuth();
  const logOut = () => {
    clearId();
    router.replace('/');
  };
  const deleteFn = () => {
    onOpen();
  };
  return (
    <Menu style={{ marginTop: 20 }}>
      <MenuTrigger>
        <FontAwesome name="user-o" size={24} color={colors.textGreen} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={logOut}>
          <Text
            style={{
              color: colors.textGreen,
              fontFamily: 'PoppinsBold',
              fontSize: 12,
            }}
          >
            Log out
          </Text>
        </MenuOption>
        <MenuOption onSelect={deleteFn}>
          <Text
            style={{ color: 'red', fontFamily: 'PoppinsBold', fontSize: 12 }}
          >
            Delete account
          </Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};
