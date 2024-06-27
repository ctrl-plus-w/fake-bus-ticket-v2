import {
  Animated,
  Platform,
  View,
  GestureResponderEvent,
  useWindowDimensions,
} from 'react-native';

import { FC, useState } from 'react';

import React from 'react';

import Spinner from '@/module/Spinner';

const SpinnerContainer: FC = () => {
  const IS_IOS = Platform.OS === 'ios';

  const dimensions = useWindowDimensions();

  const DEFAULT_X = dimensions.width / 2;
  const DEFAULT_Y = IS_IOS ? 335 : 319;

  const CIRCLE_SIZE = 50;

  const CONTAINER_SIZE = IS_IOS ? 206 : 197;
  const CONTAINER_HALF_SIZE = CONTAINER_SIZE / 2;

  const touch = React.useRef<Animated.ValueXY>(
    new Animated.ValueXY({ x: DEFAULT_X, y: DEFAULT_Y }),
  ).current;

  const [isTouching, setIsTouching] = useState(false);

  const handleMove = (event: GestureResponderEvent) => {
    if (!isTouching) setIsTouching(true);

    touch.setValue({
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
    });
  };

  const handleRelease = () => {
    Animated.spring(touch, {
      toValue: { x: DEFAULT_X, y: DEFAULT_Y },
      useNativeDriver: false,
    }).start();

    setIsTouching(false);
  };

  return (
    <View
      style={{
        zIndex: 9999999,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
      onStartShouldSetResponder={() => true}
      onResponderMove={handleMove}
      onResponderRelease={handleRelease}
    >
      <Animated.View
        pointerEvents='none'
        style={{
          zIndex: 99999,
          position: 'absolute',

          top: Animated.subtract(touch.y, CONTAINER_HALF_SIZE),
          left: Animated.subtract(touch.x, CONTAINER_HALF_SIZE),

          width: CONTAINER_SIZE,
          height: CONTAINER_SIZE,
        }}
      >
        <Spinner
          containerSize={CONTAINER_SIZE}
          circleSize={CIRCLE_SIZE}
          isTouching={isTouching}
        />
      </Animated.View>
    </View>
  );
};

export default SpinnerContainer;
