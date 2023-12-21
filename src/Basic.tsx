import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
const Basic = () => {
  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: 100,
        height: 100,
        marginTop: 80,
        transform: [
          {translateX: translation},
          {
            rotate: translation.interpolate({
              inputRange: [0, 100],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
        opacity: translation.interpolate({
          inputRange: [0,50, 100],
          outputRange: [0, 0.5,1],
          extrapolateLeft:'clamp',
          extrapolateRight:'clamp'
        }),
        backgroundColor: translation.interpolate({
          inputRange: [0, 50, 100],
          outputRange: ['orange', 'red', 'blue'],
        }),
      }}
    />
  );
};
export default Basic;
