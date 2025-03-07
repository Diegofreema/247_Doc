import { useWindowDimensions, View, Modal } from 'react-native';
import { MyText } from '../ui/MyText';
import { HStack } from '../ui/HStack';
import { Button } from '../ui/Button';

type Props = {
  onPress: () => void;
  isPending: boolean;
  isVisible: boolean;
  onDelete: () => void;
};

export const CustomModal = ({
  isVisible,
  isPending,
  onPress,
  onDelete,
}: Props): JSX.Element => {
  const { width } = useWindowDimensions();

  const finalWidth = width - 100;
  return (
    <Modal
      visible={isVisible}
      style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 40,
            alignItems: 'center',
            gap: 10,
            width: finalWidth,
            height: finalWidth,
            borderRadius: 10,
          }}
        >
          <MyText
            style={{
              fontFamily: 'PoppinsMedium',
              fontSize: 18,
              color: 'red',
              textAlign: 'center',
            }}
            text="This process can't be undone"
          />
          <MyText
            style={{
              fontFamily: 'PoppinsBold',
              fontSize: 18,
              color: 'black',
              textAlign: 'center',
            }}
            text="Are you sure you want to delete your profile?"
          />

          <HStack gap={10} flex={1}>
            <Button text="Cancel" onPress={onPress} width={100} />
            <Button
              loading={isPending}
              text="Delete"
              onPress={onDelete}
              backgroundColor={'red'}
              width={100}
            />
          </HStack>
        </View>
      </View>
    </Modal>
  );
};
