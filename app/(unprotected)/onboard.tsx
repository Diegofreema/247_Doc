import { Container } from '@/components/Container';
import { colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { HStack } from '@/components/ui/HStack';
import { useFirst } from '@/lib/zustand/useFirst';
import { IconArrowRight } from '@tabler/icons-react-native';
import { useRouter } from 'expo-router';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  runOnJS,
  SlideInRight,
} from 'react-native-reanimated';

const onBoardData = [
  {
    heading: 'Welcome to 247Doc',
    subText:
      'Africa’s Premier Virtual Consultation Service, in collaboration with 247pharmacy.net and 247Laboratory.net',
    imgUrl: require('@/assets/images/onboard-three.png'),
  },
  {
    heading: 'Get in touch any time',
    subText:
      'We are available to speak with you ANYWHERE, ANYTIME, ALL YEAR ROUND',
    imgUrl: require('@/assets/images/onboard-two.png'),
  },
  {
    heading: 'Trusted Team',
    subText:
      'Our team of fully qualified and trusted Doctors, Pharmacists, Alternative Healthcare Practitioners and Mental Health Specialists are available to provide video consultations anywhere, anytime.',
    imgUrl: require('@/assets/images/onboard-one.png'),
  },
];

const Onboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const setIsFirst = useFirst((state) => state.setIsFirst);
  const router = useRouter();
  const data = onBoardData[currentIndex];

  const onBack = () => {
    const isFirstScreen = currentIndex === 0;
    if (!isFirstScreen) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const onNext = () => {
    if (currentIndex < onBoardData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFirst();
      router.replace('/');
    }
  };

  const swipe = Gesture.Simultaneous(
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onEnd(() => {
        runOnJS(onBack)();
      }),
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onEnd(() => {
        runOnJS(onNext)();
      })
  );
  const onSkip = () => {
    setIsFirst();
    router.replace('/');
  };
  const animation = SlideInRight;
  return (
    <GestureDetector gesture={swipe}>
      <Container>
        <Animated.View key={currentIndex} entering={animation}>
          <Animated.View entering={FadeIn} style={styles.imgContainer}>
            <Image source={data.imgUrl} style={styles.img} />
          </Animated.View>

          <View style={styles.textContainer}>
            <Animated.Text entering={animation} style={styles.headingText}>
              {data.heading}
            </Animated.Text>
            <View style={{ minHeight: 110 }}>
              <Animated.Text
                entering={animation.delay(150)}
                style={styles.subText}
              >
                {data.subText}
              </Animated.Text>
            </View>
          </View>
        </Animated.View>
        <HStack justifyContent="space-between" alignItems="center">
          <TouchableOpacity onPress={onSkip}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
          <HStack gap={5}>
            {onBoardData.map((_, index) => (
              <View
                key={index}
                style={{
                  width: index === currentIndex ? 20 : 10,

                  height: 8,
                  borderRadius: 10,
                  backgroundColor:
                    index === currentIndex
                      ? colors.textGreen
                      : colors.textLight,
                }}
              />
            ))}
          </HStack>

          <Button
            height={60}
            width={60}
            borderRadius={999}
            backgroundColor={colors.textGreen}
            onPress={onNext}
            icon={IconArrowRight}
          />
        </HStack>
      </Container>
    </GestureDetector>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  imgContainer: {
    width: '100%',
    height: '60%',
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  img: { width: '100%', height: '100%' },
  textContainer: {
    marginTop: 20,
    gap: 20,
  },
  headingText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    color: 'black',
  },

  subText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'PoppinsMedium',
    color: colors.textLight,
  },
  skip: {
    color: colors.textGreen,
    fontSize: 15,
    fontFamily: 'PoppinsMedium',
  },
});
