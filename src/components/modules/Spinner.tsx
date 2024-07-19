import { Animated, Easing, View } from "react-native";

import { useEffect, useState, useRef } from "react";

import type { FC } from "react";

import React from "react";
import { useResizeable } from "@/context/ResizeableContext";

interface IProps {
  containerSize: number;
  circleSize: number;

  isTouching: boolean;
}

/**
 * Spinner
 *
 * This module is the spinner in the center of the screen.
 */
const Spinner: FC<IProps> = ({ containerSize, circleSize, isTouching }) => {
  const { isResizeMode } = useResizeable();

  const CONTAINER_HALF_SIZE = containerSize / 2;
  const CIRCLE_HALF_SIZE = circleSize / 2;

  const progress = useRef(new Animated.Value(0)).current;

  const [backgroundColors] = useState(["#391e0c", "#ff4136"]);
  const [active, setActive] = useState("animate");

  const animate = () => {
    setActive("animate");
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start((event) => {
      if (event.finished) animate();
    });
  };

  const animateBis = () => {
    setActive("animateBis");

    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start((event) => {
      if (event.finished) {
        animateBis();
      }
    });
  };

  useEffect(() => {
    if (isTouching) {
      progress.stopAnimation();
      animateBis();
    } else if (active === "animateBis") {
      progress.stopAnimation();
      animate();
    }
  }, [isTouching]);

  useEffect(() => {
    if (isResizeMode) progress.stopAnimation();
    else animate();
  }, [isResizeMode]);

  useEffect(() => {
    if (isResizeMode) animate();
  }, []);

  const interpolateRotation = progress.interpolate({
    inputRange: [1, 2],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        width: "100%",
        height: "100%",
        transform: [{ rotate: interpolateRotation }],
      }}
    >
      <View
        style={{
          position: "absolute",

          top: CONTAINER_HALF_SIZE - CIRCLE_HALF_SIZE,
          left: 0 - CIRCLE_HALF_SIZE,

          height: circleSize,
          width: circleSize,

          borderRadius: 100,

          backgroundColor: backgroundColors[0],
        }}
      />

      <View
        style={{
          position: "absolute",

          top: CONTAINER_HALF_SIZE - CIRCLE_HALF_SIZE,
          left: containerSize - CIRCLE_HALF_SIZE,

          height: circleSize,
          width: circleSize,

          borderRadius: 100,

          backgroundColor: backgroundColors[1],
        }}
      />
    </Animated.View>
  );
};

export default Spinner;
